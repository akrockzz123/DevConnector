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

import Moment from 'react-moment'

import { deleteEducation } from '../../Actions/profile';
export const Education = () => {

    const dispatch = useDispatch()
    const educations = useSelector(state => state.profile.profile.education)
    
    const Deletehandler = (id) => {
        dispatch(deleteEducation(id))
    }
const Educations = educations.length > 0 ? educations.map(exp => (
    <tr key = {exp._id}>
        <td style={{padding: '10px'}}>{exp.school}</td>
        <td classNmae="hide-sm" style={{padding: '10px'}}>{exp.degree}</td>
        <td style={{padding: '10px'}}>
            <Moment format = 'YYYY/MM/DD'>{exp.from}</Moment> - {
                exp.to === null ? ('Now') : (<Moment format = 'YYYY/MM/DD'>{exp.to}</Moment>)
            }
        </td>
        <td style={{paddingLeft: '40px'}}>
            <button className="btn btn-danger" style={{float: 'left'}} onClick = {() => Deletehandler(exp._id)}> <i className="fas fa-user-minus"></i>Delete</button>
        </td>
    </tr>
)) : (<div>Empty Fields</div>)
    return (
        <Fragment>
            <div>
            <h2 classNmae="my-2" style={{textAlign:'center',marginBottom: '20px'}}>Education credentials</h2>
            <table style={{width: "100%"}} striped bordered hover responsive className="table-sm" classNmae="table" style={{margin: 'auto',textAlign: 'space-in-between'}}>
                <thead className="table">
                    <tr>
                        <th style={{padding: '10px'}}>School</th>
                        <th className="hide-sm" style={{padding: '10px'}}>Degree</th>
                        <th className="hide-sm" style={{padding: '10px'}}>Years</th>
                    </tr>
                </thead>
                <tbody>
                    {Educations}
                </tbody>
            </table>
            </div>
            
        </Fragment>
    )
}
