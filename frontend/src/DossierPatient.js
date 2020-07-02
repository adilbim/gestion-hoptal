import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import axios from "axios";
import ListItemPatient from "./ListItemPatient1";
// import DatePicker from "react-datepicker";
// import DateTimePicker from "react-datetime-picker";
import * as Datetime from "react-datetime";
import moment from "moment";
import Demo from "./popup.js";
import { NavLink } from "react-router-dom";
import ordPut from "./popUpBilan/ordPut";

const styles = {
  input: {
    width: "40%",
    marginLeft: "35%",

    padding: "12px 12px",
    paddingLeft: "35px",
    border: " 1px solid #ccc",
    bordeRadius: "4px",
    boxSizing: "border-box",
    margin: " 4px ",
    fontSize: "11px",
    // /font-size: 16px;/
    backgroundColor: "white",
    // /background-image: url('searchIcon.png');/
    // /background-image: url('search-13-16.png');/
    // backgroundposition: "10px 10px",
    // /* background-position: 10px 10px;*/
    backgroundRepeat: "no-repeat",
    outline: " none",
  },
  buttonAjouter: {
    height: "50px",
    marginTop: "40px",
    marginRight: "18px",
    border: "1px solid rgb(106,102,223,0.19)",
    color: "rgb(106,102,223)",
    padding: "0px 2px 0px 2px",
    fontFamily: "Dosis, sans-serif",
    paddingTop: "2px",
    float: "right",
    width: "70px",
    fontSize: "20px",

    "&:hover": {
      background: "rgb(106,102,223)",
      color: "white",
    },
  },
  patient: {
    width: "72%",
    background: "gray",
    position: "relative",
  },

  patientName: {
    fontWeight: "bold",
  },
  listItem: {
    marginTop: "64px",
    display: "flex",
    padding: "15px",
    justifyContent: "space-between",
    backgroundColor: "#e1e0f8",
    marginRight: "15px",
    marginLeft: "15px",
  },

  atribute: {
    fontFamily: "Roboto",
  },

  iconList: {
    display: "flex",
    justifyContent: "space-between",
    flexBasis: "5%",
  },

  x2: {
    fontSize: "20px !important",
  },
  modal: {
    position: "absolute",
    backgroundColor: "white",
    height: "80vh",
    width: "40%",
  },

  popUpAjouter: {},
  divPatient: {
    height: "70vh",
    marginTop: "10%",
    overflowY: "scroll",
  },
};

class DossierPatient extends Component {
  static defaultProps = {
    id() {},
  };
  constructor(props) {
    super(props);
    this.state = {
      patientChosen: false,
      medecinChosen: false,
      dataPatient: [],
      serachPatient: [],
      patient: "",
      patientObj: {
        id: "",
        nom: "",
        prenom: "",
        dateDeNaiss: "",
        email: "",
        adresse: "",
        tele: "",
        sexe: "",
        nationalite: "",
        cin: "",
      },
      mthod: [false, false, false],
    };

    this.handleChange = this.handleChange.bind(this);
    this.postPatient = this.postPatient.bind(this);
    this.handlePatient = this.handlePatient.bind(this);
    this.handlePatientdate = this.handlePatientdate.bind(this);
    this.putPatient = this.putPatient.bind(this);
    this.putaPatient = this.putaPatient.bind(this);
  }

  async componentDidMount() {
    const dataPatient = await axios("/api/allPatients");
    //const dataMedecin = await axios()
    this.setState({ dataPatient: dataPatient.data });
    console.log(dataPatient.data);
  }

  handlePatient(e) {
    this.setState({
      patientObj: { ...this.state.patientObj, [e.target.name]: e.target.value },
    });

    console.log(this.state.patientObj);
  }

  handlePatientdate(date) {
    console.log(date);
    var data1 = date._d.toString().split(" ")[1];
    var data2 = date._d.toString().split(" ")[2];
    var data3 = date._d.toString().split(" ")[3];
    var data4 = date._d.toString().split(" ")[4];
    var d = new Array(data1, data2, data3, data4).join(" ");

    var dd = moment(d).format("YYYY-MM-DD hh:mm:ss");
    // var data5 = date._d.toString().split(" ")[0];

    this.setState({
      patientObj: { ...this.state.patientObj, dateDeNaiss: dd },
    });
  }

  async postPatient(e) {
    e.preventDefault();
    const obj = this.state.patientObj;
    let idPatient;
    var res = await axios.post("/api/patient", obj);
    console.log(res);
    const data = {
      id: `${res.data.id}`,
    };

    await axios.post("/api/patientDossier", data);

    this.setState({ dataPatient: [...this.state.dataPatient, obj] });
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

  putPatient(id) {
    const data = this.state.dataPatient.filter((d) => d.id === id)[0];
    this.setState({ patientObj: data });
  }

  async putaPatient(id) {
    console.log(id);
    const { patientObj } = this.state;
    var re = await axios.put(`/api/patient/${id}`, patientObj);
    console.log(re);
  }

  render() {
    const { classes } = this.props;
    const { patient, patientObj } = this.state;

    let allPatients;
    let render;

    if (this.state.dataPatient.length > 0) {
      allPatients = this.state.dataPatient.map((elm, indx) => (
        <NavLink exact to={`/profilePatient/${elm.id}`}>
          {" "}
          <ListItemPatient
            key={elm.id}
            id={elm.id}
            data={elm}
            patientAModifier={this.state.patientObj}
            putPatient={this.putPatient}
            handle={this.handlePatient}
            postPatient={this.postPatient}
            putaPatient={this.putaPatient}
            handlePatientdate={this.handlePatientdate}
            onClick={(e) => console.log("ok")}
          />
        </NavLink>
      ));
      render = (
        <div id="middle">
          <div>
            <input
              className={classes.input}
              type="text"
              placeholder="Chercher Patient"
              name="patient"
              value={patient}
              onChange={this.handleChange}
            />
          </div>
          <ordPut />
          <Popup
            trigger={
              <button
                className={classes.buttonAjouter}
                oclick={() => {
                  this.setState({
                    patientObj: {
                      nom: "",
                      prenom: "",
                      dateDeNaiss: "",
                      email: "",
                      adresse: "",
                      tele: "",
                      sexe: "",
                      nationalite: "",
                      cin: "",
                    },
                  });
                }}
              >
                Ajouter{" "}
              </button>
            }
            modal
          >
            {(close) => (
              <div className={classes.popUpAjouter}>
                <a onClick={close}>&times;</a>
                <form onSubmit={this.postPatient}>
                  <input
                    name="nom"
                    type="text"
                    value={patientObj.nom}
                    placeholder="nom"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="prenom"
                    type="text"
                    value={patientObj.prenom}
                    placeholder="prenom"
                    onChange={this.handlePatient}
                  />

                  <input
                    name="email"
                    type="email"
                    value={patientObj.email}
                    placeholder="email"
                    onChange={this.handlePatient}
                  />
                  <Datetime
                    dateFormat="YYYY-MM-DD hh:mm"
                    name="dateDeNaiss"
                    onChange={this.handlePatientdate}
                    value={patientObj.dateDeNaiss}
                  />
                  <input
                    name="adresse"
                    type="textarea"
                    value={patientObj.adresse}
                    placeholder="adresse"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="tele"
                    type="text"
                    value={patientObj.tele}
                    placeholder="tele"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="sexe"
                    type="text"
                    value={patientObj.sexe}
                    placeholder="sexe"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="nationalite"
                    type="text"
                    value={patientObj.nationalite}
                    placeholder="nationalite"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="cin"
                    type="text"
                    value={patientObj.cin}
                    placeholder="cin"
                    onChange={this.handlePatient}
                  />

                  <button type="submit">post</button>
                </form>
                <button
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  close modal
                </button>
              </div>
            )}
          </Popup>
          <div className={classes.divPatient}>{allPatients}</div>
        </div>
      );
    }
    if (this.state.patient.length > 0) {
      allPatients = this.state.searchPatient.map((elm, indx) => (
        <ListItemPatient
          key={elm.id}
          id={elm.id}
          data={elm}
          patientAModifier={this.state.patientObj}
          putPatient={this.putPatient}
          handle={this.handlePatient}
          postPatient={this.postPatient}
          putaPatient={this.putaPatient}
          onClick={(e) => console.log("ok")}
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
          <Popup
            trigger={
              <button
                className={classes.buttonAjouter}
                oclick={() => {
                  this.setState({
                    patientObj: {
                      nom: "",
                      prenom: "",
                      dateDeNaiss: "",
                      email: "",
                      adresse: "",
                      tele: "",
                      sexe: "",
                      nationalite: "",
                      cin: "",
                    },
                  });
                }}
              >
                Ajouter{" "}
              </button>
            }
            modal
          >
            {(close) => (
              <div className={classes.popUpAjouter}>
                <a onClick={close}>&times;</a>
                <form onSubmit={this.postPatient}>
                  <input
                    name="nom"
                    type="text"
                    value={patientObj.nom}
                    placeholder="nom"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="prenom"
                    type="text"
                    value={patientObj.prenom}
                    placeholder="prenom"
                    onChange={this.handlePatient}
                  />

                  <input
                    name="email"
                    type="email"
                    value={patientObj.email}
                    placeholder="email"
                    onChange={this.handlePatient}
                  />
                  <Datetime
                    dateFormat="YYYY-MM-DD hh:mm"
                    name="dateDeNaiss"
                    onChange={this.handlePatientdate}
                    value={patientObj.dateDeNaiss}
                  />
                  <input
                    name="adresse"
                    type="textarea"
                    value={patientObj.adresse}
                    placeholder="adresse"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="tele"
                    type="text"
                    value={patientObj.tele}
                    placeholder="tele"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="sexe"
                    type="text"
                    value={patientObj.sexe}
                    placeholder="sexe"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="nationalite"
                    type="text"
                    value={patientObj.nationalite}
                    placeholder="nationalite"
                    onChange={this.handlePatient}
                  />
                  <input
                    name="cin"
                    type="text"
                    value={patientObj.cin}
                    placeholder="cin"
                    onChange={this.handlePatient}
                  />

                  <button type="submit">post</button>
                </form>
                <button
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  close modal
                </button>
              </div>
            )}
          </Popup>
          <div className={classes.divPatient}>{allPatients}</div>
        </div>
      );
    }

    return <div id="middle">{render}</div>;
  }
}

export default withStyles(styles)(DossierPatient);
