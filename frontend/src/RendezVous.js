import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItemPatient from './ListItemPatient';
import ListItemMedecin from './ListItemMedecin';
import axios from 'axios';
const styles = {
    root: {
        width: "100%",
        height: "100%"
    }
}

class RendezVous extends React.Component{
    constructor(props){
        super(props);
        this.state = {patientChosen: false, medecinChosen: false, dataPatient: []};
    }

    choosePatient = () => {
        this.setState({patientChosen: true});
        alert('hello');
    }

    chooseMedecin = () => {
        this.setState({medecinChosen: true, patientChosen: false});
    }
  async componentDidMount(){
       const dataPatient = await axios('/api/allPatients');
       //const dataMedecin = await axios()
       this.setState({dataPatient: dataPatient.data});
       //console.log(dataPatient.data);
    }
render(){ 
    const {classes} = this.props;
    let allPatients;
    let render = (<div className={classes.root} id="middle">
                     <RechercheBar />
                     <h3>Loading...</h3>  
                  </div>);
    if(this.state.dataPatient.length > 0 && !this.state.patientChosen){
      allPatients = this.state.dataPatient.map((elm, indx)=> <ListItemPatient key={elm.id} data={elm} onClick={this.choosePatient} />);
      render = (<div className={classes.root} id="middle">
      <RechercheBar />
      {allPatients}
     </div>);
    }else
    if(this.state.patientChosen){
        render = (<div className={classes.root} id="middle">
                    <RechercheBar />
                    <ListItemMedecin onClick={this.chooseMedecin} />
                    <ListItemMedecin />
                   </div>);
    } else if(this.state.medecinChosen){
        render = (<div className={classes.root} id="middle">
                      <h1>Calendier</h1> 
                </div>);
    }                
   return render;
}
}


function RechercheBar(){
    return (
        <div>
            <input className="searchList" type="text" placeholder="Chercher Medecin" />
        </div>
    );
}



export default withStyles(styles)(RendezVous);