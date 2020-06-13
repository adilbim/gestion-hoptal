import React from 'react';
import './App.css';
import Menu from './menu';
import Middle from './Middle';
import ListAttente from './ListAttente';
import RendezVous from './RendezVous';
import DossierPatient from './DossierPatient';
import RendezVousAcceil from './rendezVousAcceill';
import Statistiques from './Statistiques';
import {Route, Switch} from 'react-router-dom';
import Planning from './Planning';

function App() {
  return (
    <div className="container">
      <Menu />
    <Switch>
      <Route exact path="/" render={()=> <Middle />} />
      <Route exact path="/rendezVous" render={() => /*<RendezVousAcceil />*/ <Planning />} />
      <Route exact path="/newRendezVous" render={() => <RendezVous />} />
      <Route exact path="/dossierPatient" render={() => <DossierPatient />} />
      <Route exact path="/statistiques" render={() => <Statistiques />} />
    </Switch>
     <ListAttente />
    </div>
  );
}

export default App;
