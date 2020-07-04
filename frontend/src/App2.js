import React, {useState, useEffect} from 'react';
import PrivateRoutes from './PrivateRoutes';
import Loing from './Login';
import {Route, Switch} from 'react-router-dom';


export default function App2(){
    
    return (
        <Switch>   
           <Route exact path="/login" render={(props)=> <Loing {...props} />} />
           <PrivateRoutes />
        </Switch>
    );
}