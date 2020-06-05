import React from 'react';
import {Link} from 'react-router-dom';


class Menu extends React.Component{



    render(){
        return(
        <div id="menu">
            <div class="user">
              
            </div>
            <div class="icons">
              <Link to="/" className="icon"><div ><i class="fa fa-th-large i" aria-hidden="true"></i></div></Link>
              <Link to="/rendezVous" className="icon"><div ><i class="fa fa-calendar i" aria-hidden="true"></i></div></Link>
              <Link to="/dossierPatient" className="icon"><div ><i class="fa fa-folder-open i" aria-hidden="true"></i></div></Link>
              <Link to="/statistiques" class="icon"><div ><i class="fa fa-pie-chart i" aria-hidden="true"></i></div></Link>
            </div> 
            <div class="others">
              <i class="fa fa-toggle-off dark" aria-hidden="true"></i>
            </div>
        </div>   
        )
    }
}

export default Menu;