import React from 'react'

import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Fragment } from 'react'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {addExperience} from '../Actions/profile'

export const AddExperience = ({history}) => {

    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description:''
    });

    const val = formData.current;
   console.log(formData.current)
    const toggleCheckbox = () => {
        console.log(!current)
        return !current
    };
    const [toDate, setToDate] = useState(false)

    const { company,title,location,from,to,current,description}  = formData

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value})

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addExperience(formData,history))
    }
    return (
       <Fragment>
           <section class="container">
                <h1 class="large text-primary">
                Add An Experience
                </h1>
                <p class="lead">
                    <i class="fas fa-code-branch"></i> Add any developer/programming
                    positions that you have had in the past
                </p>
                <small> = required field</small>
                <form class="form" onSubmit={submitHandler}>
                    <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value = {title} onChange = {(e) => onChange(e)} required />
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange = {(e) => onChange(e)} required />
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange = {(e) => onChange(e)}/>
                    </div>
                    <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" onChange= {(e) => onChange(e)}/>
                    </div>
                    <div class="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={(e) => setFormData({
                        ...formData,
                        current: !formData.current
                    })}/> Current Job</p>
                    </div>
                    <div class="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to}  disabled = {formData.current} onChange = {(e) => onChange(e)} />
                    </div>
                    <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                    </div>
                    <input type="submit" class="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to = '/dashboard'> Go Back</Link>
                </form>
            </section>
       </Fragment>
    )
}
