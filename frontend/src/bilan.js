import React from "react";
import axios from "axios";
import Ord from "./popUpBilan/ordenance";
import Con from "./popUpBilan/consultation";
import Ana from "./popUpBilan/analysesRadiologies";
import { withStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import OrdPut from "./popUpBilan/ordPut";
import AnaPut from "./popUpBilan/anaPut";
import ConPut from "./popUpBilan/conPut";
import moment from "moment";

const styles = {
  ord: {
    background: "white",
    heght: "550px",
    width: "522px",
    alignItem: "center",
  },
  bilans: {
    border: "1px solid rgb(106, 102, 223)",
  },
  header: {
    color: "#98ADAC",
    height: "100px",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
  },
  nameAge: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
  },
  obs: {
    marginLeft: "20px",
    fontWeight: "bold",
    fontSize: "17px",
  },
  med: {
    marginLeft: "20px",
    fontWeight: "bold",
    fontSize: "17px",
  },
  sig: {
    marginLeft: "300px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  obs2: {
    width: "100%",
    heght: "150px",
    position: "relative",
    wordWrap: "break-word",
    margin: "10px",
  },

  bilan: {
    marginLeft: "210px",
  },
  modi: {
    marginLeft: "163px",
  },
  btn: {
    backgroundColor: "rgb(245, 66, 215)",
    border: "none",
    color: "white",
    padding: "9px 22px",
    cursor: "pointer",
    fontSize: "13px",
    marginLeft: "610px",
  },
};

const Ordenance = (props) => {
  const {
    styles,
    printDocument,
    handleChange,
    ord,
    handlePut,
    patient,
  } = props;

  const classes = styles;
  const age = moment(patient.date).format("YYYY-MM-DD");

  return (
    <div>
      <OrdPut handleChange={handleChange} ord={ord} handlePut={handlePut} />
      <div id="ordenance" className={`${classes.bilan}`}>
        <div className={`${classes.ord}  ${classes.bilans}`}>
          <div className={classes.header}>
            <div>
              <p>
                le nom d'hopital
                <br />
                <hr />
                Mr.doctor name
                <br />
                specialite : heart
              </p>
            </div>
            <div>
              <p>
                {" "}
                {Date.now()}
                <br />
                Tele:06060606
              </p>
            </div>
          </div>

          <div className={classes.nameAge}>
            <p>
              Mr `{patient.nom} {patient.prenom}`
              <br />
              Age: {age}
            </p>
          </div>

          <div>
            <p className={classes.obs}> Observation:</p>
            <div className={classes.obs2}>{ord.observation}</div>
          </div>

          <div>
            <p className={classes.med}> Les medicament</p>
            <ul>
              <li>first </li>
              <li>second</li>
              <li>third</li>
              <li>fourth</li>
            </ul>
            <p className={classes.sig}>Signature:</p>
          </div>
        </div>
      </div>
      <button
        className={classes.btn}
        onClick={() => printDocument("ordenance")}
      >
        <i class="fa fa-download"></i> Download
      </button>
    </div>
  );
};
const Analyses = (props) => {
  const {
    styles,
    printDocument,
    handleChange,
    handlePut,
    ana,
    handleDrop,
    analyses,
    patient,
  } = props;

  const li = ana.typeA.split(" ").map((d) => {
    return <li>{d}</li>;
  });

  const classes = styles;
  return (
    <div>
      <AnaPut
        handleChange={handleChange}
        handlePut={handlePut}
        ana={ana}
        handleDrop={handleDrop}
        analyses={analyses}
      />
      <div id="analyses" className={`${classes.bilan}`}>
        <div className={`${classes.ord}  ${classes.bilans}`}>
          <div className={classes.header}>
            <div>
              <p>
                le nom d'hopital
                <br />
                <hr />
                Mr.sabir hamza
                <br />
                specialite : heart
              </p>
            </div>
            <div>
              <p>
                {" "}
                25/04/2020
                <br />
                Tele:06060606
              </p>
            </div>
          </div>

          <div className={classes.nameAge}>
            <p>
              Mr {patient.nom} {patient.prenom}
              <br />
              Age: {patient.date}
            </p>
          </div>

          <div>
            <p className={classes.obs}> Observation:</p>
            <div className={classes.obs2}>{ana.observation}</div>
          </div>

          <div>
            <p className={classes.med}> Les Analyses</p>
            <ul>{li}</ul>
            <p className={classes.sig}>Signature:</p>
          </div>
        </div>
      </div>
      <button className={classes.btn} onClick={() => printDocument("analyses")}>
        <i class="fa fa-download"></i> Download
      </button>
    </div>
  );
};
const Consultation1 = (props) => {
  const { styles, printDocument, handleChange, handlePut, con } = props;

  const classes = styles;
  return (
    <div>
      <ConPut handleChange={handleChange} handlePut={handlePut} con={con} />

      <div id="consultation" className={`${classes.bilan} `}>
        <div className={`${classes.ord}  ${classes.bilans}`}>
          <div className={classes.header}>
            <div>
              <p>
                le nom d'hopital
                <br />
                <hr />
                Mr.sabir hamza
                <br />
                specialite : heart
              </p>
            </div>
            <div>
              <p>
                {" "}
                25/04/2020
                <br />
                Tele:06060606
              </p>
            </div>
          </div>

          <div className={classes.nameAge}>
            <p>
              Mr chfnaj mohammed
              <br />
              Age: 54 ans
            </p>
          </div>

          <div>
            <p className={classes.obs}> Observation:</p>
            <div className={classes.obs2}>
              n livre spécimen de polices de texte. Il n'a pas fait que survivre
              cinq siècles, mais s'est aussi adapté à la bureautique
              informatique, sans que son contenu n'en soit modifié.
            </div>
            <p className={classes.sig}>Signature:</p>
          </div>
        </div>
      </div>
      <button
        className={classes.btn}
        onClick={() => printDocument("consultation")}
      >
        <i class="fa fa-download"></i> Download
      </button>
    </div>
  );
};

class Bilan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ord: {
        observation: "",
        titre: "",
        medicament: "",
      },
      con: {
        observation: "",
        poids: "",
      },
      ana: {
        observation: "",
        typeA: "",
        typeR: "",
      },
      analyses: [],
      dataRdv: {
        dateR: "",
        service: "",
        presence: "",
        prix: "",
        date: "",
        cheminDeBilan: "",
        idPatient: "",
        idMedecin: "",
      },
      showOrd: false,
      showAna: false,
      showCon: false,
      patientObj: {
        id: "",
        nom: "",
        prenom: "",
        dateDeNaiss: "",
        email: "",
        adresse: "",
        tele: "",
        sexe: "",
        nationalite: "",
        cin: "",
      },
    };

    this.handleChangeOrd = this.handleChangeOrd.bind(this);
    this.handleSubmitOrd = this.handleSubmitOrd.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.handleChangeana = this.handleChangeana.bind(this);
    this.handleSubmitAna = this.handleSubmitAna.bind(this);
    this.handleChangeCon = this.handleChangeCon.bind(this);
    this.handleSubmitCon = this.handleSubmitCon.bind(this);
    this.handleConPut = this.handleConPut.bind(this);
    this.handleOrdPut = this.handleOrdPut.bind(this);
    this.handleAnaPut = this.handleAnaPut.bind(this);

    this.handleDropAna = this.handleDropAna.bind(this);
  }
  async componentDidMount() {
    var res = await axios("/api/analyses");

    this.setState({ analyses: res.data }, () => {
      console.log(this.state.analyses);
    });

    var res1 = await axios(`/api/dataRdv/${this.props.match.params.id}`);

    this.setState({
      dataRdv: res1.data[0],
    });

    const patientData = await axios(
      `/api/patient/'${this.state.dataRdv.idPatient}'`
    );

    this.setState({ patientObj: patientData.data[0] });

    const con = await axios(
      `/api/con/${this.state.dataRdv.idPatient}${this.props.match.params.id}`
    );

    const ord = await axios(
      `/api/ord/${this.state.dataRdv.idPatient}${this.props.match.params.id}`
    );

    const ana = await axios(
      `/api/ana/${this.state.dataRdv.idPatient}${this.props.match.params.id}`
    );
    console.log(ana);
    this.setState({ ana: ana.data[0] }, () => {
      console.log(ana.data[0]);
    });
    this.setState({ ord: ord.data[0] }, () => {
      console.log(this.state.ord);
    });
    this.setState({ con: con.data[0] }, () => {});

    console.log(this.state);
    if (ord.data.length === 0) {
      this.setState({ showOrd: false });
    } else {
      this.setState({ showOrd: true });
    }

    if (ana.data.length === 0) {
      this.setState({ showAna: false });
    } else {
      this.setState({ showAna: true });
    }
    if (con.data.length === 0) {
      this.setState({ showCon: false });
    } else {
      this.setState({ showCon: true });
    }

    //get data from 3
  }

  handleChangeOrd(e) {
    console.log(e.target.name);
    console.log(e.target.value);

    this.setState({
      ord: { ...this.state.ord, [e.target.name]: e.target.value },
    });
  }

  async handleSubmitOrd(e) {
    e.preventDefault();
    this.setState({ showOrd: true });
    // const res1 = await(`/api/dataRdv/'${this.props.match.params.id}'`)
    const res = await axios(`/api/dossier/${this.state.dataRdv.idPatient}`);
    console.log(res);

    const data = {
      titre: this.state.ord.titre,
      observation: this.state.ord.observation,
      id: `${this.state.dataRdv.idPatient}${this.props.match.params.id}`,
      idDossier: `${res.data[0].id}`,
    };

    await axios
      .post("/api/ord", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  handleChangeCon(e) {
    this.setState(
      { con: { ...this.state.con, [e.target.name]: e.target.value } },
      () => {}
    );
  }

  async handleOrdPut(e) {
    const res = await axios(`/api/dossier/${this.state.dataRdv.idPatient}`);
    console.log(res.data[0].id);

    const data = {
      titre: this.state.ord.titre,
      observation: this.state.ord.observation,

      idDossier: `${res.data[0].id}`,
    };
    await axios
      .put(
        `/api/ord/${this.state.dataRdv.idPatient}${this.props.match.params.id}`,
        data
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  async handleSubmitCon(e) {
    e.preventDefault();
    this.setState({ showCon: true });

    const res = await axios(`/api/dossier/${this.state.dataRdv.idPatient}`);
    console.log(res.data[0].id);

    const data = {
      observation: this.state.con.observation,
      id: `${this.state.dataRdv.idPatient}${this.props.match.params.id}`,
      idDossier: `${res.data[0].id}`,
    };

    await axios
      .post("/api/con", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  async handleConPut(e) {
    e.preventDefault();

    const res = await axios(`/api/dossier/${this.state.dataRdv.idPatient}`);
    console.log(res.data[0].id);

    const data = {
      observation: this.state.con.observation,

      idDossier: `${res.data[0].id}`,
    };

    await axios
      .put(
        `/api/con/${this.state.dataRdv.idPatient}${this.props.match.params.id}`,
        data
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  handleChangeana(e) {
    this.setState(
      { ana: { ...this.state.ana, [e.target.name]: e.target.value } },
      () => {}
    );
  }
  handleDropAna(e, d) {
    console.log(d.value);

    var typeA = d.value.join("*");
    console.log(typeA);
    this.setState({ ana: { ...this.state.ana, typeA: typeA } });
    //axios post medicament
  }

  async handleSubmitAna(e) {
    e.preventDefault();

    this.setState({ showAna: true });
    const res = await axios(`/api/dossier/${this.state.dataRdv.idPatient}`);
    console.log(res.data[0].id);

    const data = {
      titre: this.state.ana.titre,
      observation: this.state.ana.observation,
      typeA: this.state.ana.typeA,
      typeR: "",
      date: "2000-01-01 10:10:10",
      id: `${this.state.dataRdv.idPatient}${this.props.match.params.id}`,
      idDossier: `${res.data[0].id}`,
    };

    await axios
      .post("/api/ana", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  async handleAnaPut(e) {
    const res = await axios(`/api/dossier/${this.state.dataRdv.idPatient}`);
    console.log(res.data[0].id);

    const data = {
      titre: this.state.ana.titre,
      observation: this.state.ana.observation,
      typeA: this.state.ana.typeA,
      typeR: "",
      date: "2000-01-01 10:10:10",

      idDossier: `${res.data[0].id}`,
    };

    await axios
      .put(
        `/api/ana/${this.state.dataRdv.idPatient}${this.props.match.params.id}`,
        data
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  printDocument(name) {
    html2canvas(document.querySelector(`#${name}`)).then((canvas) => {
      // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "in",
        format: [450, 400],
      });
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <div id="middle">
        {!this.state.showOrd ? (
          <Ord
            handleChange={this.handleChangeOrd}
            handleSubmit={this.handleSubmitOrd}
          />
        ) : (
          <Ordenance
            patient={this.state.patientObj}
            styles={this.props.classes}
            printDocument={this.printDocument}
            handleChange={this.handleChangeOrd}
            ord={this.state.ord}
            handlePut={this.handleOrdPut}
          />
        )}

        {!this.state.showAna ? (
          <Ana
            handleDrop={this.handleDropAna}
            analyses={this.state.analyses}
            handleSubmit={this.handleSubmitAna}
            handleChange={this.handleChangeana}
          />
        ) : (
          <Analyses
            patient={this.state.patientObj}
            styles={this.props.classes}
            printDocument={this.printDocument}
            handleChange={this.handleChangeana}
            handleDrop={this.handleDropAna}
            ana={this.state.ana}
            handlePut={this.handleAnaPut}
            analyses={this.state.analyses}
          />
        )}

        {!this.state.showCon ? (
          <Con
            handleSubmit={this.handleSubmitCon}
            handleChange={this.handleChangeCon}
          />
        ) : (
          <Consultation1
            patient={this.state.patientObj}
            styles={this.props.classes}
            printDocument={this.printDocument}
            handleChange={this.handleChangeCon}
            con={this.state.con}
            handlePut={this.handleConPut}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Bilan);
