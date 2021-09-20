import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
const ProfileTop = ({profile: {
    status,
    company,
   
    website,
    
    user: {name,avatar}
}}) => {
    const dispatch = useDispatch()
    const {profile} = useSelector(state => state.profile)
    const userinfo = useSelector(state => state.userInfo)
    return (
        <div>
            <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 class="large">{name}</h1>
          <p class="lead">{status}</p>
          <p></p>
          <div class="icons my-1">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>
            )}
           
           
          </div>
        </div>
        </div>
    )
}


export default ProfileTop
