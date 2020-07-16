import React from "react";
import axios from "axios";
import moment from "moment";
import * as Datetime from "react-datetime";
import ListItem from "./secretaireList";

class SecretaireList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSec: [],
    };
  }

  async componentDidMount() {
    var res = await axios("/api/allSecretaires");
    this.setState({ dataSec: res.data });
  }
  render() {
    let render = this.state.dataSec.map((d, i) => (
      <ListItem data={d} key={i} />
    ));
    return render;
  }
}

export default SecretaireList;
