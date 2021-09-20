import React from 'react'

import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Fragment } from 'react'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {addEducation} from '../Actions/profile'

export const AddEducation = ({history}) => {

    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description:''
    });

   
    const toggleCheckbox = () => {
        console.log(!current)
        return !current
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addEducation(formData,history))
    }
    const [toDate, setToDate] = useState(false)

    const { school,degree,fieldofstudy,from,to,current,description}  = formData

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value})

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
                        <p class="lead">
                        <i class="fas fa-code-branch"/>Add any school branch
                        </p>
                    <input type="text" placeholder="* school" name="school" value = {school} onChange = {(e) => onChange(e)} required />
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="* degree" name="degree" value={degree} onChange = {(e) => onChange(e)} required />
                    </div>
                    <div class="form-group">
                    <input type="text" placeholder="fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange = {(e) => onChange(e)}/>
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
