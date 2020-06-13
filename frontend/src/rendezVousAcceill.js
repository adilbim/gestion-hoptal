import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

const styles = {

}

class RendezVousAcceill extends React.Component{



    render(){


        return(
            <div id="middle">
                <h1>hello min jadid</h1>
                <Link to="/newRendezVous">creat new rendezVous</Link>
            </div>
        );
    }
}


export default RendezVousAcceill;