import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from "lodash";
import "../form.css";

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

export default function OrdenancePut(props) {
  const { id, handleChange, handlePut, ord, handleDrop } = props;

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
      <i
        className="fa fa-pencil --modi"
        aria-hidden="true"
        onClick={(e) => {
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
            <form onSubmit={handlePut} className="-form">
              <input
                type="text"
                name="titre"
                placeholder="titre"
                value={ord.titre}
                onChange={handleChange}
              />
              <textarea
                name="observation"
                placeholder="Observstion..."
                onChange={handleChange}
                value={ord.observation}
              />
              <Dropdown
                multiple
                search
                selection
                closeOnChange
                options={[
                  { key: 0, text: "fffff", value: 0 },
                  { key: 1, text: "fkk", value: 1 },
                ]}
                onChange={handleDrop}
                placeholder="I close on change"
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
