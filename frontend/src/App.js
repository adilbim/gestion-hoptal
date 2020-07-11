import React from "react";
import "./App.css";
import Menu from "./menu";
import Middle from "./Middle";
import ListAttente from "./ListAttente";
import RendezVous from "./RendezVous";
import DossierPatient from "./DossierPatient";
import RendezVousAcceil from "./rendezVousAcceill";
import Statistiques from "./Statistiques";
import { Route, Switch } from "react-router-dom";
import Planning from "./Planning";
import ProfilePatient from "./ProfilePatient";
import Bilan from "./bilan";
import Admin from "./personnel/admin";
import Medecin from "./personnel/medecin";
import MedecinList from "./personnel/medecinList";
import SecretaireList from "./personnel/secretaireList";

import ListItemPersonel from "./personnel/listItemPersonel";

function App() {
  return (
    <div className="container">
      <Menu />
      <Switch>
        <Route exact path="/" render={() => <Middle />} />
        <Route exact path="/rendezVous" render={() => <RendezVousAcceil />} />
        <Route
          exact
          path="/planning/:idUser"
          render={(props) => <Planning {...props} />}
        />
        <Route
          exact
          path="/profilePatient/:idPatient"
          render={(props) => <ProfilePatient {...props} />}
        />
        <Route exact path="/newRendezVous" render={() => <RendezVous />} />
        <Route exact path="/dossierPatient" render={() => <DossierPatient />} />
        <Route
          exact
          path="/bilan/:id"
          render={(props) => <Bilan {...props} />}
        />
        <Route exact path="/statistiques" render={() => <Statistiques />} />
        <Route exact path="/personel" render={() => <Admin />} />

        <Route exact path="/listMedecin" render={() => <MedecinList />} />
        <Route exact path="/listSecretaire" render={() => <SecretaireList />} />

        <Route exact path="/ajouterPerso" render={() => <Medecin />} />
        <Route
          exact
          path="/profilePerso/:id"
          render={(props) => <ListItemPersonel {...props} />}
        />
      </Switch>
      <ListAttente />
    </div>
  );
}

export default App;
