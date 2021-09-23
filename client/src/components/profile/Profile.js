import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'


import setAuthToken from "../../utils/setAuthToken";

import { getProfileById } from '../../Actions/profile'

import ProfileTop from './ProfileTop'

import { ProfileAbout } from './ProfileAbout'

import ProfileExperience from './ProfileExperience'

import ProfileGithub from './ProfileGithub'
const Profile = ({match}) => {

    const dispatch = useDispatch()
    const {profile} = useSelector(state => state.profile)
    const userinfo = useSelector(state => state.loginAuth)

    const {user} = userinfo
    //const users = JSON.parse(userinfo)
    useEffect(() => {
        dispatch(getProfileById(match.params.id))
    },[getProfileById]);

    //console.log(userinfo.user._id,profile.user)
    
    return (
        <Fragment>
           {profile !== null &&
           <div className="container">
               <hr></hr>
               <hr></hr>
               <Link style={{marginTop : '100px',marginLeft: '500px'}}to='/profiles' className="btn btn-primary">Back to profiles</Link>
               {(userinfo.isAuthenticated && 
                userinfo.user._id === profile.user)  ? 
                  (<Link to = '/edit-profile' className='btn btn-light'>
                      Edit your Profile 
                  </Link>,
                  <div className='profile-grid my-1'>
                      <ProfileTop profile={profile}/>
                      <ProfileAbout profile={profile}/>
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                {profile.experience.map((exp) => (
                                    <ProfileExperience key ={exp._id} experience={exp}/>
                                ))}
                            </Fragment>
                            )
                        : (<h4>No experience Credentials</h4>)}

                    </div>

                    {profile.githubusername && (
                        <ProfileGithub username ={profile.githubusername}/>
                    )}
                  </div>
                  )
                      : (<div>You have not created the profile</div>)}
            </div>
            }
        </Fragment>
    )
}


export default Profile
