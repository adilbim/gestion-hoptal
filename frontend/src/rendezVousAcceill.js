import React, {useState, useEffect} from 'react';
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ListItemMedecin from './ListItemMedecin';
import axios from 'axios';
const styles = {
   floatingButton: {
    position: "fixed",
    bottom: "50px",
    right: "400px",
    cursor: "pointer",
    background: "#6a66df",
    color: "white",
    "&:hover": {
      background: "#5f5bc8",
    },
   },
   listContainer: {
     width:'100%',
     height: '90%',
     overflow: 'overlay'
   }
}

function RendezVousAcceill(props){
    const [input, setInput] = useState("");
    const [allMedecin, setAllMedecin] = useState([]);
    let addRendezVous = () => {
        props.history.push("/newRendezVous");
    }
    let handleChange = e => {
       setInput(e.target.value);
    }
    useEffect(()=>{
        async function getAllMedecin(){ 
          const dataMedecin = await axios("/api/allMedecin");
          setAllMedecin(dataMedecin);  
        }
        getAllMedecin();
     },[]);

    useEffect(()=>{
      console.log(allMedecin);
    },[allMedecin]);
    const handleClick = id => {
      props.history.push(`/planning/${id}`);
    } 
    const {classes} = props;
    let doctors = []
    if(allMedecin.data)
    doctors = allMedecin.data.map((elm)=> <ListItemMedecin key={elm.id} data={elm} onClick={handleClick} />);
     return(
        <div id="middle">
            <div>
            <input
              className="searchList"
              type="text"
              placeholder="Chercher Le Planning d'un Medecin"
              name="patient"
              value={input}
              onChange={handleChange}
            />
            </div>
            <div className={classes.listContainer}>
             {doctors}
            </div>
            <Fab
            aria-label="add"
            className={classes.floatingButton}
            onClick={addRendezVous}
            title="Cree Un Nouveau Rendez-vous"
            >
            <AddIcon />
          </Fab>
         </div>
     );
    
}


export default withStyles(styles)(RendezVousAcceill);