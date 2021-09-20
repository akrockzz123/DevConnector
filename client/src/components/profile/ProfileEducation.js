import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import Moment from 'react-moment'


 const ProfileExperience = ({experience : {
    company,title,location,current,to,from,description
}}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format = 'YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment fromat = 'YYYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    )
}


export default ProfileExperience