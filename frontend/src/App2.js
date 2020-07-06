import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import Loing from './Login';
import TvList from './tvList'
import {Route, Switch} from 'react-router-dom';


export default function App2(){
    
    return (
        <Switch>   
           <Route exact path="/login" render={(props)=> <Loing {...props} />} />
           <Route exact path="/tvList" render={(props)=> <TvList {...props} />} />
           <PrivateRoutes />
        </Switch>
    );
}