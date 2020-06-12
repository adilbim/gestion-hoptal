import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItemPatient from "./ListItemPatient1";
import ListItemMedecin from "./ListItemMedecin";
import axios from "axios";
const styles = {
  root: {
    width: "100%",
    height: "100%",
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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  choosePatient = () => {
    this.setState({ patientChosen: true });
    alert("patient choisi");
  };

  chooseMedecin = () => {
    this.setState({ medecinChosen: true });
    alert("medecin choisi");
  };
  async componentDidMount() {
    const dataPatient = await axios("/api/allPatients");
    //const dataMedecin = await axios()
    this.setState({ dataPatient: dataPatient.data });
    console.log(dataPatient.data);
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
    } else if (!this.state.medecinChosen) {
      render = (
        <div className={classes.root} id="middle">
          <RechercheBar />
          <ListItemMedecin onClick={this.chooseMedecin} />
          <ListItemMedecin onClick={this.chooseMedecin} />
        </div>
      );
    } else {
      render = (
        <div className={classes.root} id="middle">
          <h1>Calendier</h1>
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
