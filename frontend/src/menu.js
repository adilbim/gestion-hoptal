import React from 'react';
import {NavLink} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import jwt from 'jsonwebtoken';

const styles = {
  active: {
    borderColor: "#6a66df !important",
    "& i": {
      color: "#6a66df"
    }
  }
}

class Menu extends React.Component{
  state = {
    user: {}
  }  
  componentDidMount(){
    if(localStorage.getItem('user')){ 
    let user = jwt.verify(localStorage.getItem('user'), 'shhhhh');
    this.setState({user});
    }
  }
  
  

  render(){
    const {classes} = this.props;
    const {user} = this.state;
        return(
        <div id="menu">
            <div class="user">
              
            </div>
            <div class="icons">
              <NavLink exact activeClassName={classes.active} to="/" className="icon"><div ><i class="fa fa-th-large i" aria-hidden="true"></i></div></NavLink>
              <NavLink exact activeClassName={classes.active} to={user.role ==='medecin'? `/planning/${user.id}` :'/rendezVous'} className="icon"><div ><i class="fa fa-calendar i" aria-hidden="true"></i></div></NavLink>
              <NavLink exact activeClassName={classes.active} to="/dossierPatient" className="icon"><div ><i class="fa fa-folder-open i" aria-hidden="true"></i></div></NavLink>
              <NavLink exact activeClassName={classes.active} to="/statistiques" className="icon"><div ><i class="fa fa-pie-chart i" aria-hidden="true"></i></div></NavLink>
            </div> 
            <div class="others">
              <i class="fa fa-toggle-off dark" aria-hidden="true"></i>
            </div>
        </div>   
        )
    }
}

export default withStyles(styles)(Menu);