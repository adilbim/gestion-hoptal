import React from 'react';


class ListeAttente extends React.Component{



    render(){

        return(
        <div id="right">

            <div class="lsearch">
              <input class="searchList"type="text" placeholder="Chercher Medecin" />
              <div class="listInfo">
                <span>Jan,21 Jeudi</span> <span>|</span> <span>Dr.Bimzagh</span>
              </div>
            </div>
      
            <div class="rdvE">
      
              <div class="rdvItem">
      
                <div class="nameDate">
                    <div class="name"><i class="fa fa-user-circle" aria-hidden="true"></i> hamza sabir</div>
                    <div class="cin">bh400500</div>
                </div>
                   <div class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> 11:50:00</div>
              </div>
      
      
              <div class="rdvItem">
                
                <div class="nameDate">
                    <div class="name">hamza sabir</div>
                    <div class="cin">bh400500</div>
                </div>
                   <div class="time">11:50:00</div>
              </div>
              
              <div class="rdvItem">
                
                <div class="nameDate">
                    <div class="name">hamza sabir</div>
                    <div class="cin">bh400500</div>
                </div>
                   <div class="time">11:50:00</div>
              </div>
              
              <div class="rdvItem">
                
                <div class="nameDate">
                    <div class="name">hamza sabir</div>
                    <div class="cin">bh400500</div>
                </div>
                   <div class="time">11:50:00</div>
              </div>
              
              <div class="rdvItem">
                
                <div class="nameDate">
                    <div class="name">hamza sabir</div>
                    <div class="cin">bh400500</div>
                </div>
                   <div class="time">11:50:00</div>
              </div>
              
              <div class="rdvItem">
                
                <div class="nameDate">
                    <div class="name">hamza sabir</div>
                    <div class="cin">bh400500</div>
                </div>
                   <div class="time">11:50:00</div>
              </div>
              </div>
      
           
            <div class="rdvR">
           3
            </div>
            <div class="link">
              
              <a href="#">les listes d'attendes</a>
            </div>
      
      
          </div>

          
        );
    }
}


export default ListeAttente;