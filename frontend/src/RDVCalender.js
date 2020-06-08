import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
  ViewSwitcher,
  Toolbar,
  Scheduler,
  DayView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog
} from "@devexpress/dx-react-scheduler-material-ui";

//import { appointments } from "../../../demo-data/appointments";

export default class RDVCalender extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    //   data: appointments,
      data: [],
      currentDate: new Date(),
      currentViewName: "Month"
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName });
    };
    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data, currentViewName } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        currentViewName = "Month";
      }
      if (changed) {
        data = data.map(appointment =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }

      return { data, currentViewName };
    });
  }

  render() {
    const { currentDate, data, currentViewName } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />
          <MonthView startDayHour={9} endDayHour={19} />
          <DayView />
          <ConfirmationDialog />
          <Toolbar />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
