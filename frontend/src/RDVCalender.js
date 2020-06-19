import * as React from "react";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  ViewSwitcher,
  WeekView,
  Toolbar,
  Scheduler,
  DayView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import io from "socket.io-client";
//import { appointments } from "../../../demo-data/appointments";

export default class RDVCalender extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //   data: appointments,
      data: this.props.rendezVous,
      currentDate: new Date(),
      currentViewName: "Month",
      now: {},
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.commitChanges = this.commitChanges.bind(this);
    console.log(this.props.rendezVous);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(
      (state) => {
        let { data, now } = state;
        //var now = '';
        if (added) {
          const startingAddedId =
            data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];
          let date = [
            data[data.length - 1].startDate.toString().split(" ")[1],
            data[data.length - 1].startDate.toString().split(" ")[2],
            data[data.length - 1].startDate.toString().split(" ")[3],
            data[data.length - 1].startDate.toString().split(" ")[4],
          ];
          now.date = moment(date.join(" ")).format("YYYY-MM-DD hh:mm:ss");
          now.title = data[data.length - 1].title;
          now.action = "added";
        }
        if (changed) {
          data = data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          );
          now.action = "changed";
          //console.log(changed);
          now = {
            ...now,
            ...changed[Object.keys(changed)],
            id: Object.keys(changed),
          };
          console.log(now);
        }
        if (deleted !== undefined) {
          data = data.filter((appointment) => appointment.id !== deleted);
          //console.log(deleted);
          now.action = "deleted";
          now.id = deleted;
        }

        return { data, now };
      },
      () =>{ 
        this.props.chooseRDV(this.state.now);
        this.socket.emit('RendezVous',{...this.state.now,idMedecin: this.props.idMedecin});
      }
    );
    //
  }
   
  componentDidMount(){
    this.socket = io("http://127.0.0.1:3001");
    this.socket.on('rendezVous1',data =>{
      if(data.idMedecin === this.props.idMedecin){
        this.setState({data: [...this.state.data,{...data,startDate: data.date,endDate: moment(data.date).add(30,'m')}]});
      }
    });
    
  }
  render() {
    const { currentDate, data, currentViewName } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            // currentDate={currentDate}
            defaultCurrentDate={new Date()}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />
          <MonthView startDayHour={9} endDayHour={19} />
          <DayView />
          <WeekView />
          <ConfirmationDialog />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
