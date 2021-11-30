import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import { addFriend } from '../../Actions/allFriend'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import setAuthToken from "../../utils/setAuthToken";

import { Button } from 'react-bootstrap'
import { GetUser } from '../../Actions/auth'


 const ProfileItem = (props) => {

    //console.log(prof)
    const dispatch = useDispatch()

    console.log(props.data,"shoe")
    const prof = props.data
    const show = props.show
    const add = () => {
        dispatch(addFriend(prof.user))
        
    }
    return (
        <div className="profile bg-light">
            
            <div>
                {prof.user}
                <p>{prof.status} {prof.company && <span>at {prof.company}</span>}</p>
                <p className="my-1">{prof.location && <span>{prof.location}</span>}</p>
                <Link to ={`/profile/${prof.user}`} className="btn btn-primary">
                    View profile
                </Link>
                {show === false ? <Button onClick={add} style={{position: 'absolute',marginLeft: '700px'}}>Add Friend</Button> : <iv></iv>}
            </div>
            <ul>
                {prof.skills.slice(0,4).map((skill,index) => (
                    <li key={index} className="text-primary">
                        <i className='fas fa-check' /> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default ProfileItem
