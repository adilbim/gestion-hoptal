import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from "lodash";
import "../form.css";
const getOptions = (number, prefix = "Choice ") =>
  _.times(number, (index) => ({
    key: index,
    text: `${prefix}${index}`,
    value: index,
  }));

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
    right: "400px",
    cursor: "pointer",
    background: "#6a66df",
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

export default function Consultation(props) {
  const { id, handleChange, handleSubmit } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
        Consultation
      </button> */}
      <Fab
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        title="Consulatation"
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
              <textarea
                name="observation"
                placeholder="Observstion..."
                onChange={handleChange}
              />
              <input type="text" name="poids" onChange={handleChange} />

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
