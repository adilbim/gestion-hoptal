import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import axios from "axios";
import "../form.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",

    background: "#eee",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  floatingButton: {
    position: "fixed",
    bottom: "50px",
    right: "560px",
    cursor: "pointer",
    background: "rgb(235, 189, 52)",
    color: "white",
    "&:hover": {
      background: "#5f5bc8",
    },
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

export default function Ordenance(props) {
  const { id, handleChange, handleSubmit, handleDrop, analyses } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const getAnalyses = () => {
    var analyse = analyses.map(function (a, index) {
      return {
        key: index,
        text: a.nom,
        value: a.nom,
      };
    });
    return analyse;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        Analyses
      </button> */}
      <Fab
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        title="Analyses"
        aria-label="add"
        className={classes.floatingButton}
      >
        <AddIcon />
      </Fab>
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
            <form onSubmit={handleSubmit} className="-form">
              <input
                type="text"
                name="titre"
                placeholder="titre"
                onChange={handleChange}
              />
              <textarea
                name="observation"
                placeholder="Observstion..."
                onChange={handleChange}
              />
              <Dropdown
                multiple
                search
                selection
                closeOnChange
                options={getAnalyses()}
                placeholder="type Analyses"
                onChange={handleDrop}
              />{" "}
              <Dropdown
                multiple
                search
                selection
                closeOnChange
                options={[
                  { key: 0, text: "fffff", value: 0 },
                  { key: 1, text: "fkk", value: 1 },
                ]}
                // onChange={handleDrop}
                placeholder="types Radiologies"
              />{" "}
              <button type="submit" className="--button --button2">
                save
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
