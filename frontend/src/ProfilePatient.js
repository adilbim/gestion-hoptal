import React from "react";
import axios from "axios";
import moment from "moment";
import Ord from "./popUpBilan/ordenance";

import "./profile.css";
import { NavLink } from "react-router-dom";

const ProfileRdvItem = (props) => {
  const { date } = props;

  const rdvTime = moment(date).format("YYYY-MM-DD hh:mm:ss");

  return (
    <div className="_td">
      <div className="_time">
        <i className="fa fa-clock-o" aria-hidden="true"></i>

        {rdvTime}
      </div>
      <div className="_description">
        this is the description
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </div>
    </div>
  );
};

class ProfilePatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
        image: "",
      },

      Rdv: [],
      nbrConsultation: 0,
    };
  }

  async componentDidMount() {
    const res = await axios(
      `/api/patient/'${this.props.match.params.idPatient}'`
    );

    const Rdv = await axios(
      `/api/rendezVous/patient/'${this.props.match.params.idPatient}'`
    );

    const consultation = await axios(
      `/api/patient/nbrConsultation/'${this.props.match.params.idPatient}'`
    );
    console.log(consultation.data.res_Count.count);

    this.setState({ nbrConsultation: consultation.data.res_Count.count }, () =>
      console.log(this.state.nbrConsultation)
    );

    this.setState({ Rdv: Rdv.data });

    this.setState({ data: res.data[0] });
  }

  render() {
    const { data } = this.state;

    const date = moment(data.dateDeNaiss).format("YYYY-MM-DD ");

    const RdvItem = this.state.Rdv.map((d, index) => (
      <NavLink
        to={{
          pathname: `/bilan/${d.id}`,
          aboutProps: {
            idP: `${this.props.match.params.idPatient}`,
          },
        }}
      >
        <ProfileRdvItem key={index} date={d.date} />
      </NavLink>
    ));

    return (
      <div id="middle">
        <div className="_profile">
          <div className="_picture">
            <div className="_pic">
              <img src="pic1.png" className="_pic1" />
            </div>
            <div className="_name">
              {data.nom} {data.prenom}
            </div>
          </div>
          <div className="_info">
            <div className="_personal">
              <div className="_1">Personal Information</div>
              <div className="_2">
                <div className="_style1">
                  {" "}
                  Gender : <span className="_style2">{data.sexe}</span>{" "}
                </div>
                <div className="_style1">
                  {" "}
                  Date of birth : <span className="_style2">{date}</span>{" "}
                </div>
              </div>
              <div className="_2">
                <div className="_style1">
                  {" "}
                  CIN : <span className="_style2">{data.cin}</span>{" "}
                </div>
                <div className="_style1">
                  {" "}
                  nationality :{" "}
                  <span className="_style2">{data.nationalite}</span>{" "}
                </div>
              </div>
              <div className="_style1">
                {" "}
                Adress : <span className="_style2"> {data.adresse}</span>{" "}
              </div>
            </div>
            <div className="_contact">
              <div className="_1">Contact Information </div>
              <div className="_style1">
                Phone number : <span className="_style2">{data.tele}</span>{" "}
              </div>
              <div className="_style1">
                E-mail : <span className="_style2">{data.email}</span>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ************************rdv**************************-->      */}
        <div className="_rdv">
          <div className="_consultation">
            <div className="_icon">
              <img src="https://img.icons8.com/nolan/64/doctors-folder.png" />
            </div>
            <div className="_number">8 consultations</div>
            <div className="_desc">
              The major complications of diabetes include dangerously elevated
              blood sugars..{" "}
            </div>
          </div>
          {/* <!--*******************LIST************************** --> */}
          <div className="_list">
            <div className="_ap">
              <div className="_appointment">
                <i className="fa fa-file-text" aria-hidden="true"></i> All
                Appointments{" "}
              </div>
              <div className="_more">
                <i className="fa fa-circle-o" aria-hidden="true"></i>
                <i className="fa fa-circle-o" aria-hidden="true"></i>{" "}
                <i className="fa fa-circle-o" aria-hidden="true"></i>
              </div>
            </div>

            {RdvItem}
          </div>
        </div>

        <div className="_analyse"></div>
      </div>
    );
  }
}

export default ProfilePatient;
