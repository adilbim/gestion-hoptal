import React from "react";
import axios from "axios";
import moment from "moment";
import * as Datetime from "react-datetime";

class Medecin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nom: "",
      prenom: "",
      username: "",
      password: "",
      email: "",
      cin: "",
      sexe: "female",
      role: "medecin",
      dateDeNaiss: "",
      adresse: "",
      tele: "",
      nationalite: "",
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePatientdate = this.handlePatientdate.bind(this);
    this.postPersonel = this.postPersonel.bind(this);
  }

  handleChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }
  handlePatientdate(date) {
    console.log(date);
    var data1 = date._d.toString().split(" ")[1];
    var data2 = date._d.toString().split(" ")[2];
    var data3 = date._d.toString().split(" ")[3];
    var data4 = date._d.toString().split(" ")[4];
    var d = new Array(data1, data2, data3, data4).join(" ");

    var dd = moment(d).format("YYYY-MM-DD hh:mm:ss");
    // var data5 = date._d.toString().split(" ")[0];

    this.setState({
      ...this.state,
      dateDeNaiss: dd,
    });
  }

  async postPersonel(e) {
    const obj = this.state;
    var res = await axios.post("/api/user", obj);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.postPersonel}>
          <select name="role" onChange={this.handleChange}>
            <option value="secretaire">secretaire</option>
            <option value="medecin">medecin</option>
          </select>
          <input
            name="username"
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <input
            name="nom"
            type="text"
            value={this.state.nom}
            placeholder="nom"
            onChange={this.handleChange}
          />
          <input
            name="prenom"
            type="text"
            value={this.state.prenom}
            placeholder="prenom"
            onChange={this.handleChange}
          />

          <input
            name="email"
            type="email"
            value={this.state.email}
            placeholder="email"
            onChange={this.handleChange}
          />
          <Datetime
            dateFormat="YYYY-MM-DD hh:mm"
            name="dateDeNaiss"
            onChange={this.handlePatientdate}
            value={this.state.dateDeNaiss}
          />
          <input
            name="adresse"
            type="textarea"
            value={this.state.adresse}
            placeholder="adresse"
            onChange={this.handleChange}
          />
          <input
            name="tele"
            type="text"
            value={this.state.tele}
            placeholder="tele"
            onChange={this.handleChange}
          />
          <select
            name="sexe"
            onChange={this.handleChange}
            value={this.state.sexe}
          >
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
          <input
            name="nationalite"
            type="text"
            value={this.state.nationalite}
            placeholder="nationalite"
            onChange={this.handleChange}
          />
          <input
            name="cin"
            type="text"
            value={this.state.cin}
            placeholder="cin"
            onChange={this.handleChange}
          />

          <button type="submit">post</button>
        </form>
      </div>
    );
  }
}

export default Medecin;
