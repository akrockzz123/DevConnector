import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'

import { SetAlert } from '../Actions/alertAction';

import Alert from './layout/Alert';

import { RegisterUser } from '../Actions/auth';

import { useEffect } from 'react';
const Register = ({ setAlert, register, isAuthenticated },props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const dispatch = useDispatch()
  const alertData = useSelector(state=> state.alert)

  const userLoginData= useSelector(state => state.userInfo)

  const [successLogin,setSuccessLogin] = useState('');

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    console.log(userLoginData.isAuthenticated)
    setSuccessLogin(userLoginData.isAuthenticated);
   
},[userLoginData.isAuthenticated])

  const onChange = (e) =>{
    console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      //setAlert('Passwords do not match', 'danger');
     dispatch(SetAlert('Passwords do not match','danger'));
    } else {

        dispatch(RegisterUser({name,email,password}))
      //register({ name, email, password });
    }
  };

  if(successLogin)
  {
    console.log("yoyo")
    return <Redirect to ='/dashboard'/>
  }
  
  return (
    <Fragment>
      
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
        {alertData.length > 0 && <Alert/>}
       <hr></hr>
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" onSubmit = {onSubmit} className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
