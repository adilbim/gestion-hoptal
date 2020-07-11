import React from "react";
import { withStyles } from "@material-ui/styles";
import Popup from "reactjs-popup";

import axios from "axios";
import moment from "moment";
import * as Datetime from "react-datetime";

const styles = {
  // patient:{
  //     width : "72%",
  //     background:"gray",
  //     position:"relative"

  //   },

  patientName: {
    fontWeight: "bold",
  },
  listItem: {
    display: "flex",
    padding: "15px",
    justifyContent: "space-between",
    backgroundColor: "#e1e0f8",
    margin: "5px 20px",
    "&:hover": {
      backgroundColor: "#cac9df",
    },
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
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      prenom: "",
      username: "",
      password: "",
      email: "",
      cin: "",
      sexe: "",
      dateDeNaiss: "",
      adresse: "",
      tele: "",
      nationalite: "",
    };
  }
  handlePersonelDate(date) {
    var d = moment(date).format("yyyy-mm-dd hh:mm:ss");
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
  handlePutPersonel(e) {
    const obj = this.state;

    var res = axios.put(`/api/personel`, obj);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { classes, data } = this.props;

    let put;

    return (
      <div className={classes.listItem}>
        <div className={classes.atribute}>
          <i className="fa fa-user-circle x2" aria-hidden="true"></i>
        </div>
        <div
          className={`${classes.atribute} ${classes.patientName}`}
        >{` DR.${data.nom} ${data.prenom}`}</div>
        <div className={classes.atribute}>{data.cin}</div>
        <div className={classes.atribute}>{data.dateDeNaiss.split("T")[0]}</div>
        <div className={classes.atribute}>{data.tele}</div>
        <div className={classes.iconList}>
          <i className="fa fa-eye" aria-hidden="true"></i>
          <i className="fa fa-pencil" aria-hidden="true">
            <Popup
              trigger={
                <button className={classes.buttonAjouter}>modifier </button>
              }
              modal
            >
              {(close) => (
                <div className={classes.popUpAjouter}>
                  <a onClick={close}>&times;</a>
                  <form onSubmit={this.handlePutPersonel}>
                    <select
                      name="role"
                      value={data.role}
                      onChange={this.handleChange}
                    >
                      <option value="secretaire">secretaire</option>
                      <option value="medecin">medecin</option>
                    </select>

                    <input
                      name="nom"
                      type="text"
                      value={data.nom}
                      placeholder="nom"
                      onChange={this.handleChange}
                    />
                    <input
                      name="prenom"
                      type="text"
                      value={data.prenom}
                      placeholder="prenom"
                      onChange={this.handleChange}
                    />

                    <input
                      name="email"
                      type="email"
                      value={data.email}
                      placeholder="email"
                      onChange={this.handleChange}
                    />
                    <Datetime
                      dateFormat="YYYY-MM-DD hh:mm"
                      name="dateDeNaiss"
                      onChange={this.handlePersonelDate}
                      value={data.dateDeNaiss}
                    />
                    <input
                      name="adresse"
                      type="textarea"
                      value={data.adresse}
                      placeholder="adresse"
                      onChange={this.handleChange}
                    />
                    <input
                      name="tele"
                      type="text"
                      value={data.tele}
                      placeholder="tele"
                      onChange={this.handleChange}
                    />

                    <select
                      name="sexe"
                      onChange={this.handleChange}
                      placeholder="Gender"
                      value={data.sexe}
                    >
                      <option value="female">female</option>
                      <option value="male">male</option>
                    </select>
                    <input
                      name="nationalite"
                      type="text"
                      value={data.nationalite}
                      placeholder="nationalite"
                      onChange={this.handleChange}
                    />
                    <input
                      name="cin"
                      type="text"
                      value={data.cin}
                      placeholder="cin"
                      onChange={this.handleChange}
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
          </i>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ListItem);
