import React from "react";
import axios from "axios";
import moment from "moment";
import * as Datetime from "react-datetime";

class SecretaireList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSec: [],
    };
  }

  componentDidMount() {
    var res = axios("/api/allSecretaire");
  }
  render() {
    let render = this.state.dataSec.map((d) => <listItem data={d} />);
    return <div></div>;
  }
}

export default SecretaireList;
