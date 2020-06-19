import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItemPatient from "./ListItemPatient";
import ListItemMedecin from "./ListItemMedecin";
import axios from "axios";
import RDVCalender from "./RDVCalender";
import moment from "moment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import io from "socket.io-client";
const styles = {
  root: {
    width: "100%",
    height: "100%",
  },
  floatingButton: {
    position: "fixed",
    bottom: "50px",
    right: "400px",
    cursor: "pointer",
    background: "#6a66df",
    color: "white",
    "&:hover": {
      background: "#5f5bc8",
    },
  },
};

class RendezVous extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientChosen: false,
      medecinChosen: false,
      dataPatient: [],
      serachPatient: [],
      patient: "",
      dataMedecin: [],
      RendezVousMedecin: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.newRendezVous = {
      dateR: "2020-05-25 12:45:55",
      service: "consultation",
      presence: false,
      prix: 255.0,
      date: "2020-05-25 12:45:55",
      cheminDeBilan: "fill it later",
      idPatient: "1401",
      idMedecin: "1102",
    };
    this.chooseMedecin = this.chooseMedecin.bind(this);
  }

  choosePatient = (id) => {
    this.setState({ patientChosen: true });
    this.newRendezVous.idPatient = id;
    alert("patient choisi", id);
  };

  async chooseMedecin(id) {
    this.newRendezVous.idMedecin = id;
    let data = await axios(`api/rendezVous/medecin/${id}`);

    data.data.forEach((elm) => {
      elm.endDate = moment(elm.startDate).add(30,'m');
    });
    this.setState({ medecinChosen: true, RendezVousMedecin: data.data });
    console.log(this.state.RendezVousMedecin);

    //.format("ddd MMM DD YYYY hh:mm:00") +" GMT+0100 (GMT+01:00)";
  }

  getDate = (data) => {
    if (data.action === "added") {
      this.newRendezVous.date = data.date;
      this.newRendezVous.service = data.title;
      axios.post("api/RendezVous", this.newRendezVous);
      
    } else if (data.action === "changed") {
      axios.put("api/rendezVous", { ...data });
      console.log("from axios put request");
    } else if (data.action === "deleted") {
      //console.log('from the delete request');
      axios.delete(`api/rendezVous/${data.id}`);
    }
  };
  async componentDidMount() {
    
    const dataPatient = await axios("/api/allPatients");
    const dataMedecin = await axios("/api/allMedecin");
    this.setState({
      dataPatient: dataPatient.data,
      dataMedecin: dataMedecin.data,
    });
    
    //console.log(dataPatient.data);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.chercher(e.target.value);
  }

  chercher = (cle) => {
    let patient = this.state.dataPatient.filter((elm) =>
      elm.nom
        .concat(...[" ", elm.prenom, " ", elm.cin, " ", elm.tele])
        .toLowerCase()
        .includes(cle.toLowerCase())
    );
    this.setState({ searchPatient: patient });
  };

  addNewPatient = () => {
    alert("we will add the feature soon, stay tuned!");
  };
  render() {
    const { classes } = this.props;
    const { patient } = this.state;
    let allPatients;
    let render = (
      <div className={classes.root} id="middle">
        <RechercheBar />
        <h3>Loading...</h3>
      </div>
    );
    if (this.state.dataPatient.length > 0 && !this.state.patientChosen) {
      allPatients = this.state.dataPatient.map((elm, indx) => (
        <ListItemPatient key={elm.id} data={elm} onClick={this.choosePatient} />
      ));
      render = (
        <div className={classes.root} id="middle">
          <div>
            <input
              className="searchList"
              type="text"
              placeholder="Chercher Medecin"
              name="patient"
              value={patient}
              onChange={this.handleChange}
            />
          </div>
          {allPatients}
          <Fab
            aria-label="add"
            className={classes.floatingButton}
            onClick={this.addNewPatient}
          >
            <AddIcon />
          </Fab>
        </div>
      );
      if (this.state.patient.length > 0) {
        allPatients = this.state.searchPatient.map((elm, indx) => (
          <ListItemPatient
            key={elm.id}
            data={elm}
            onClick={this.choosePatient}
          />
        ));
        render = (
          <div className={classes.root} id="middle">
            <div>
              <input
                className="searchList"
                type="text"
                placeholder="Chercher Medecin"
                name="patient"
                value={patient}
                onChange={this.handleChange}
              />
            </div>
            {allPatients}
          </div>
        );
      }
    } else if (!this.state.medecinChosen && this.state.patientChosen) {
      let allMedecin = this.state.dataMedecin.map((elm) => (
        <ListItemMedecin key={elm.id} data={elm} onClick={this.chooseMedecin} />
      ));
      render = (
        <div className={classes.root} id="middle">
          <RechercheBar />
          {allMedecin}
        </div>
      );
    } else if (this.state.medecinChosen && this.state.patientChosen) {
      render = (
        <div className={classes.root} id="middle">
          <RDVCalender
            chooseRDV={this.getDate}
            rendezVous={this.state.RendezVousMedecin}
            idMedecin={this.newRendezVous.idMedecin}
          />
        </div>
      );
    }
    return render;
  }
}

function RechercheBar() {
  return (
    <div>
      <input
        className="searchList"
        type="text"
        placeholder="Chercher Medecin"
      />
    </div>
  );
}

export default withStyles(styles)(RendezVous);
