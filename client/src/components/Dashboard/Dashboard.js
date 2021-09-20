import React from 'react'

import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'

import { SetAlert } from '../../Actions/alertAction';

import Alert from '../layout/Alert';

import { getCurrentProfile } from '../../Actions/profile';

import { useState } from 'react';

import { useEffect } from 'react';
import { Fragment } from 'react';

import { DashboardAction } from './DashboardAction'

import { Experience } from './Experience';

import {Education} from './Education'

import { deleteAccount } from '../../Actions/profile';

import { GetUser } from '../../Actions/auth';
const Dashboard = props => {

    const userinfo = useSelector(state => state.userInfo)

    const login = useSelector(state => state.loginAuth)
    const dispatch = useDispatch()
    const profiledata = useSelector(state => state.profile)
    //const [profiles,setProfiles] = useState('')

    useEffect(() => {
       // console.log("abcfg")
       dispatch(getCurrentProfile())
       //console.log("abcfg")
      // setProfiles(profiledata)
      // dispatch(GetUser())
    }, [getCurrentProfile])
    
    const DeleteAccount = () => {
        dispatch(deleteAccount())
    }
    return  localStorage.getItem('token') === null ?  (<Redirect to = '/login'/>) : (
        <Fragment>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>Welcome {userinfo.user !== null && userinfo.user.name}
            </p>
            {profiledata.profile !== null && userinfo.isAuthenticated  ? (
                <Fragment>
                    <DashboardAction/>
                    <hr></hr>
                    
                    <button className="btn btn-danger"  style = {{margin: 'auto'}} onClick = { DeleteAccount}> <i className="fas fa-user-minus"></i>Delete Account</button>
                </Fragment>
            ): !userinfo.isAuthenticated ? (<Redirect to = '/login'/>) : (
                <Fragment>
                    <p>You have not set up the profile</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">Create profile</Link>
                </Fragment>
            )}
             
        </Fragment>
    )
}



export default Dashboard
