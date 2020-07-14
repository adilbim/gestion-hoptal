import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import * as Datetime from "react-datetime";
import moment from "moment";
import "./form.css";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    overflow: "scroll",
    height: "80vh",
    background: "#eee",

    backgroundColor: "",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal(props) {
  const {
    data,
    id,
    putPatient,

    putaPatient,
    handlePatientdate,

    handle,
    postPatient,
  } = props;
  let { patientAModifier } = props;

  console.log("pop");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    putPatient();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <i
        className="fa fa-pencil"
        aria-hidden="true"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          handleOpen();
        }}
      ></i>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={putaPatient} className="-form">
              <h4>NOM</h4>
              <input
                name="nom"
                type="text"
                value={patientAModifier.nom}
                placeholder="nom"
                onChange={handle}
              />
              <h4>PRENOM:</h4>
              <input
                name="prenom"
                type="text"
                value={patientAModifier.prenom}
                placeholder="prenom"
                onChange={handle}
              />
              <h4>EMAIL:</h4>
              <input
                name="email"
                type="email"
                value={patientAModifier.email}
                placeholder="email"
                onChange={handle}
              />
              <h4>DATE DE NAISSANCE:</h4>
              <div className="-DIVd">
                {moment(patientAModifier.dateDeNaiss).format("YYYY MO DD")}
              </div>
              <Datetime
                dateFormat="YYYY-MM-DD hh:mm"
                name="dateDeNaiss"
                onChange={handlePatientdate}
                value={patientAModifier.dateDeNaiss}
                input={false}
              />
              <h4>ADRESSE:</h4>

              <input
                name="adresse"
                type="textarea"
                value={patientAModifier.adresse}
                placeholder="adresse"
                onChange={handle}
              />
              <h4>TELE:</h4>
              <input
                name="tele"
                type="text"
                value={patientAModifier.tele}
                placeholder="tele"
                onChange={handle}
              />
              <h4>GENDER:</h4>
              <div className="box">
                <select
                  name="sexe"
                  onChange={handle}
                  vlaue={patientAModifier.sexe}
                >
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>
              </div>

              <h4>NATIONALITE:</h4>
              <input
                name="nationalite"
                type="text"
                value={patientAModifier.nationalite}
                placeholder="nationalite"
                onChange={handle}
              />
              <h4>CIN:</h4>
              <input
                name="cin"
                type="text"
                value={patientAModifier.cin}
                placeholder="cin"
                onChange={handle}
              />
              <button type="submit" className="--button --button2">
                post
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
