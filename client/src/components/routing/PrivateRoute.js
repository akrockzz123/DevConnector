import React from 'react'
import { Component } from 'react'

import { useSelector,useState } from 'react-redux'

import { Route } from 'react-router'

import { Redirect } from 'react-router'

export const PrivateRoute = ({ component: Component, ...rest}) => {

    const userinfo = useSelector(state => state.userInfo)
    console.log(userinfo)
    return (
       <div>
           <Route {...rest} render = {props => (userinfo.isAuthenticated === false) ? (<Redirect to='/login'/>): (<Component {...props}/>)}/>
       </div>
    );
   

   }
