import React from "react";
import axios from "axios";
import moment from "moment";
import * as Datetime from "react-datetime";
import ListItem from "./listItemPersonel";

class Medecin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataMedecin: [],
    };
  }

  async componentDidMount() {
    var res = await axios("/api/allMedecins");
    console.log(res);
    this.setState({ dataMedecin: res.data });
  }
  render() {
    let render = this.state.dataMedecin.map((d) => <ListItem data={d} />);
    return <div id="middle">{render}</div>;
  }
}

export default Medecin;
