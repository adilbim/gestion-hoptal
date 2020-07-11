import React from "react";
import { withStyles } from "@material-ui/styles";
import Popup from "reactjs-popup";
import Demo from "./popup.js";
import history from "./history";

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
    background: "yellow",
  },

  x2: {
    fontSize: "20px !important",
  },
};

function ListItemPatient(props) {
  const {
    classes,
    data,
    id,
    putPatient,
    putaPatient,
    patientAModifier,
    handlePatientdate,

    handle,
    postPatient,
  } = props;
  console.log("list");

  return (
    <div
      className={classes.listItem}
      onClick={(e) => {
        e.stopPropagation();
        history.push(`/profilePatient/${id}`);
      }}
    >
      <div className={classes.atribute}>
        <i className="fa fa-user-circle x2" aria-hidden="true"></i>
      </div>
      <div
        className={`${classes.atribute} ${classes.patientName}`}
      >{`${data.nom} ${data.prenom}`}</div>
      <div className={classes.atribute}>{data.cin}</div>
      <div className={classes.atribute}>{data.dateDeNaiss.split("T")[0]}</div>
      <div className={classes.atribute}>{data.tele}</div>

      <div className={classes.iconList}>
        <i className="fa fa-eye" aria-hidden="true"></i>
        <Demo
          putPatient={(e) => {
            putPatient(id);
          }}
          putaPatient={(e) => {
            putaPatient(id);
          }}
          patientAModifier={patientAModifier}
          handle={handle}
          postPatient={postPatient}
          handlePatientdate={handlePatientdate}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(ListItemPatient);
