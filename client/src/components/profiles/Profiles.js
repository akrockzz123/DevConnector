import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import ProfileItem from './ProfileItem'

import setAuthToken from "../../utils/setAuthToken";

import { getPost } from '../../Actions/post'
export const Profiles = ({match}) => {

    const dispatch = useDispatch();

  

    const profileData = useSelector(state => state.profile)

    const { profiles, loading } = profileData

    //const [data,setData] = useState('')

    useEffect(() => {
       
        dispatch(getProfiles())

        //setData(profiles)
        //dispatch({type: 'CLEAR_PROFILE'})
    },[getProfiles]);


    
    return (
        <Fragment>
            { !loading &&
            (<div className="container">
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connect'></i>
                </p>
                {profiles.map((prof,index) => (
                    <div><ProfileItem id={index} data = {prof}/></div>
                ))}
                
            </div>)}
        </Fragment>
       
    );
}
