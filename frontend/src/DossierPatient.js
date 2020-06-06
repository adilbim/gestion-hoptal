import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";

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
    /*font-size: 16px;*/
    backgroundColor: "white",
    /*background-image: url('searchIcon.png');*/
    /*background-image: url('search-13-16.png');*/
    backgroundposition: "10px 10px",
    /* background-position: 10px 10px;*/
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
};

class DossierPatient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="middle">
        {/* {this.state.showPopUp ? (
          <div className={classes.popUpAjouter}>
            <h1>hello</h1>
          </div>
        ) : null} */}

        <input
          className={classes.input}
          type="text"
          placeholder="Chercher Patient"
        />
        <Popup
          trigger={<button className={classes.buttonAjouter}>Ajouter </button>}
          modal
        >
          {(close) => (
            <div className={classes.popUpAjouter}>
              <a onClick={close}>&times;</a>
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
        <div className={classes.listItem}>
          <div className={classes.atribute}>
            <i className="fa fa-user-circle x2" aria-hidden="true"></i>
          </div>
          <div className={`${classes.atribute} ${classes.patientName}`}>
            NOM & PRENOM
          </div>
          <div className={classes.atribute}>BH500500</div>
          <div className={classes.atribute}>11/8/1900</div>
          <div className={classes.atribute}>0660550554</div>
          <div className={classes.iconList}>
            <i className="fa fa-eye" aria-hidden="true"></i>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DossierPatient);
