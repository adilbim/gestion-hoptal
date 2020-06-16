

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import moment from 'moment';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#e1e0f8',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    // width: 250
});

class App extends Component {
    state = {
        items: [],
        selected: []
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
                
            }

            this.setState(state);
        } else {
            
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            
            this.setState({
                items: result.droppable,
                selected: result.droppable2
            },()=>this.putRendezVous(source.droppableId,this.state,destination.index));
            //
            //console.log(source.droppableId)
            //console.log(this.state.selected[destination.index])
        }
        
    };
    
    putRendezVous(droppableId, data,index){
      
        if(droppableId === 'droppable'){ 
            axios.put('/api/listAttente',data.selected[index]);
        //console.log(data);
        }else{
            axios.put('/api/listAttente',data.items[index]);
        }
        //console.log(data, index);
    }

    async componentDidMount(){
      let rdvE = await axios('/api/listAttente/E');
      let rdvR = await axios('/api/listAttente/R');
      //console.log(data);
      this.setState({items: rdvE.data, selected: rdvR.data});
    }
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
          <div id="right">
            <div class="lsearch">
               <input class="searchList"type="text" placeholder="Chercher Medecin" />
               <div class="listInfo">
                 <span>Jan,21 Jeudi</span> <span>|</span> <span>Dr.Bimzagh</span>
               </div>
             </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="rdvE"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                           className="rdvItem"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {/* {item.content} */}
                                            <div class="nameDate">
                                            <div class="name"><i class="fa fa-user-circle" aria-hidden="true"></i>{item.nom+' '+ item.prenom}</div>
                                            <div class="cin">{item.cin}</div>
                                          </div>
                                            <div class="time"><i class="fa fa-clock-o" aria-hidden="true"></i>{moment(item.date).format('hh:mm:ss')}</div>
                                         </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div className="rdvR"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div className="rdvItem"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {/* {item.content} */}
                                            <div class="nameDate">
                                            <div class="name"><i class="fa fa-user-circle" aria-hidden="true"></i>{item.nom+' '+ item.prenom}</div>
                                            <div class="cin">{item.cin}</div>
                                          </div>
                                            <div class="time"><i class="fa fa-clock-o" aria-hidden="true"></i>{moment(item.date).format('hh:mm:ss')}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div class="link">
              
               <a href="#">les listes d'attendes</a>
             </div>
          </div>
        );
    }
}













export default App;









/////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react';


// class ListeAttente extends React.Component{



//     render(){

//         return(
//         <div id="right">

//             <div class="lsearch">
//               <input class="searchList"type="text" placeholder="Chercher Medecin" />
//               <div class="listInfo">
//                 <span>Jan,21 Jeudi</span> <span>|</span> <span>Dr.Bimzagh</span>
//               </div>
//             </div>
      
//             <div class="rdvE">
      
//               <div class="rdvItem">
      
//                 <div class="nameDate">
//                     <div class="name"><i class="fa fa-user-circle" aria-hidden="true"></i> hamza sabir</div>
//                     <div class="cin">bh400500</div>
//                 </div>
//                    <div class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> 11:50:00</div>
//               </div>
      
      
//               <div class="rdvItem">
                
//                 <div class="nameDate">
//                     <div class="name">hamza sabir</div>
//                     <div class="cin">bh400500</div>
//                 </div>
//                    <div class="time">11:50:00</div>
//               </div>
              
//               <div class="rdvItem">
                
//                 <div class="nameDate">
//                     <div class="name">hamza sabir</div>
//                     <div class="cin">bh400500</div>
//                 </div>
//                    <div class="time">11:50:00</div>
//               </div>
              
//               <div class="rdvItem">
                
//                 <div class="nameDate">
//                     <div class="name">hamza sabir</div>
//                     <div class="cin">bh400500</div>
//                 </div>
//                    <div class="time">11:50:00</div>
//               </div>
              
//               <div class="rdvItem">
                
//                 <div class="nameDate">
//                     <div class="name">hamza sabir</div>
//                     <div class="cin">bh400500</div>
//                 </div>
//                    <div class="time">11:50:00</div>
//               </div>
              
//               <div class="rdvItem">
                
//                 <div class="nameDate">
//                     <div class="name">hamza sabir</div>
//                     <div class="cin">bh400500</div>
//                 </div>
//                    <div class="time">11:50:00</div>
//               </div>
//               </div>
      
           
//             <div class="rdvR">
//            3
//             </div>
//             <div class="link">
              
//               <a href="#">les listes d'attendes</a>
//             </div>
      
      
//           </div>

          
//         );
//     }
// }


// export default ListeAttente;