import React from 'react';
import {Navigate} from 'react-router-dom';

export default function PublicdRoutes({children}){
    if(localStorage.getItem('token1')){
      return <Navigate to='/'></Navigate>
    }
    else{
       return children;
    }
}