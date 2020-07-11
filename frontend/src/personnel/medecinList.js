import React from "react";
import axios from "axios";
import moment from "moment";
import * as Datetime from "react-datetime";
import ListItem from "./medecinList";

class Medecin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataMedecin: [],
    };
  }

  componentDidMount() {
    var res = axios("/api/allMedecin");
  }
  render() {
    let render = this.state.dataMedecin.map((d) => <listItem data={d} />);
    return <div></div>;
  }
}

export default Medecin;
