import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import * as Datetime from "react-datetime";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
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
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        Modifier
      </button>
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
            <form onSubmit={putaPatient}>
              <input
                name="nom"
                type="text"
                value={patientAModifier.nom}
                placeholder="nom"
                onChange={handle}
              />
              <input
                name="prenom"
                type="text"
                value={patientAModifier.prenom}
                placeholder="prenom"
                onChange={handle}
              />
              <input
                name="email"
                type="email"
                value={patientAModifier.email}
                placeholder="email"
                onChange={handle}
              />
              <Datetime
                dateFormat="YYYY-MM-DD hh:mm"
                name="dateDeNaiss"
                onChange={handlePatientdate}
                value={patientAModifier.dateDeNaiss}
              />
              <input
                name="adresse"
                type="textarea"
                value={patientAModifier.adresse}
                placeholder="adresse"
                onChange={handle}
              />
              <input
                name="tele"
                type="text"
                value={patientAModifier.tele}
                placeholder="tele"
                onChange={handle}
              />
              <input
                name="sexe"
                type="text"
                value={patientAModifier.sexe}
                placeholder="sexe"
                onChange={handle}
              />
              <input
                name="nationalite"
                type="text"
                value={patientAModifier.nationalite}
                placeholder="nationalite"
                onChange={handle}
              />
              <input
                name="cin"
                type="text"
                value={patientAModifier.cin}
                placeholder="cin"
                onChange={handle}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
