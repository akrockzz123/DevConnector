import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import setAuthToken from "../../utils/setAuthToken";


 const ProfileItem = ({data}) => {

    const dispatch = useDispatch()

    console.log("abcd")
    return (
        <div className="profile bg-light">
            <img src={data.user.avatar} alt="" className="round-img"/>
            <div>
                {data.user}
                <p>{data.status} {data.company && <span>at {data.company}</span>}</p>
                <p className="my-1">{data.location && <span>{data.location}</span>}</p>
                <Link to ={`/profile/${data.user}`} className="btn btn-primary">
                    View profile
                </Link>
            </div>
            <ul>
                {data.skills.slice(0,4).map((skill,index) => (
                    <li key={index} className="text-primary">
                        <i className='fas fa-check' /> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default ProfileItem
