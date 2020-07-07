import React from "react";
import "./App.css";
import Menu from "./menu";
import Middle from "./Middle";
import ListAttente from "./ListAttente";
import RendezVous from "./RendezVous";
import DossierPatient from "./DossierPatient";
import RendezVousAcceil from "./rendezVousAcceill";
import Statistiques from "./Statistiques";
import { Route, Switch, Redirect } from "react-router-dom";
import Planning from "./Planning";
import ProfilePatient from "./ProfilePatient";
import Bilan from "./bilan";


class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {isLoggedIn: false, user:{}};
  // }
  //   useEffect(()=>{
  //     checkUser()
  //     console.log(localStorage.getItem('user'));
      
  //   },[localStorage.getItem('user')]);
  //   console.log(user,isLoggedIn);
  // //   useEffect(()=>{
  // //     //setUser('please');  
  // //    //setIsLoggedIn(true);
  // //     //debugger;
  // //     console.log('senconde usEffect',isLoggedIn, user);
  // //  },[user])
  // const checkUser = () => {
  //   return jwt.verify(localStorage.getItem('user'), 'shhhhh', function(err, decoded) {
        
  //     if(err) { console.log(err);}
  //     return setIsLoggedIn(true);
  //     //debugger;
  //   });
  // }
  // , (err, decoded) => {
  //   this.setState({isLoggedIn: true, user: decoded});    
  //   console.log(this.state);
  // });
// async componentDidMount(){
//   try{ 
//   let Vtoken = jwt.verify(localStorage.getItem('user'), 'shhhhh');
//   }catch(err){
//     console.log(err);
//   }
//   this.setState({isLoggedIn: true});
//   console.log(this.state);
// }  
render(){   
  return (
    
    <div className="container">
      <Menu />
      <Switch>
        <Route exact path="/" render={(props) => localStorage.getItem('isLoggedIn') ? <Middle {...props} /> : <Redirect to="/login" />} />
        <Route exact path="/rendezVous" render={(props) => <RendezVousAcceil {...props} />} />
        <Route
          exact
          path="/planning/:idUser"
          render={(props) => localStorage.getItem('isLoggedIn') ? <Planning {...props} /> : <Redirect to="/login" />}
        />
        <Route
          exact
          path="/profilePatient/:idPatient"
          render={(props) => localStorage.getItem('isLoggedIn') ? <ProfilePatient {...props} /> : <Redirect to="/login" />}
        />
        <Route exact path="/newRendezVous" render={(props) => localStorage.getItem('isLoggedIn') ? <RendezVous {...props} />: <Redirect to="/login"/>} />
        <Route exact path="/dossierPatient" render={() => localStorage.getItem('isLoggedIn') ? <DossierPatient /> : <Redirect to="/login"/>} />
        <Route
          exact
          path="/bilan/:id"
          render={(props) => <Bilan {...props} />}
        />
        <Route exact path="/statistiques" render={() => localStorage.getItem('isLoggedIn') ? <Statistiques /> : <Redirect to="/login" />} />
      </Switch>
      <ListAttente />
     </div> 

  );
}
}

export default App;
