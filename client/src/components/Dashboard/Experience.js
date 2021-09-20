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


import { deleteExperience } from '../../Actions/profile';
import Moment from 'react-moment'

export const Experience = () => {

    const dispatch = useDispatch()
    const DeleteExperience = (ex) => {
        //e.preventDefault()

        dispatch(deleteExperience(ex._id))
    }
    const experience = useSelector(state => state.profile.profile.experience)
    
const experiences = experience.length > 0 ? experience.map(exp => (

    <tr key = {exp._id}>
        <td>{exp.company}</td>
        <td classNmae="hide-sm">{exp.title}</td>
        <td>
            <Moment format = 'YYYY/MM/DD'>{exp.from}</Moment> - {
                exp.to === null ? ('Now') : (<Moment format = 'YYYY/MM/DD'>{exp.to}</Moment>)
            }
        </td>
        <td>
            <button className="btn btn-danger" style={{float: 'left'}} onClick = {() => {DeleteExperience(exp._id)}}>Delete</button>
        </td>
    </tr>
)) : (<div>No Experience Added</div>)
    return (
        <Fragment>
            <div>
            <h2 classNmae="my-2" style={{textAlign:'center',marginBottom: '20px'}}>Experience credentials</h2>
            <table striped bordered hover responsive className="table-sm" classNmae="table" style={{margin: 'auto'}}>
                <thead className="table">
                    <tr>
                        <th>Comapny</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
            </div>
            
        </Fragment>
    )
}
