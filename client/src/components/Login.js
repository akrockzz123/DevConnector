import React from 'react'

import {Fragment,useState} from 'react'

import axios from 'axios';

import {Link, Redirect } from 'react-router-dom'

import { Button} from 'react-bootstrap'

import { LoginAction } from '../Actions/auth';

import { SetAlert } from '../Actions/alertAction';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import Alert from './layout/Alert';

import { GetUser } from '../Actions/auth';

export const Login = () => {

    const dispatch = useDispatch();

    const [successLogin,setSuccessLogin] = useState('');

    const userLoginData= useSelector(state => state.userInfo)

    const alertData = useSelector(state=> state.alert)

    //const userData = useSelector(state => state.)

    useEffect(() => {
        console.log(userLoginData.isAuthenticated)
        if(userLoginData.isAuthenticated !== null)
        setSuccessLogin(userLoginData.isAuthenticated);
       
    },[userLoginData.user])

    const [formData,setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });


    const { email,password,password2} = formData;

  

    const OnChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit =  e => {
        e.preventDefault();
        console.log(email,password)
        if(password !== password2) {
            dispatch(SetAlert('Passwords do not match','danger'));
        } else {


            dispatch(LoginAction(email,password));
           
        }
    }
    console.log(successLogin)

    if(successLogin)
    {
        const userdata = JSON.stringify(userLoginData.user)

        localStorage.setItem('userdata',userdata)
        return <Redirect to ='/dashboard'/>
    }
    return (
        <Fragment>
            
            <body>
                <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                {alertData.length > 0 && <Alert/>}
                </nav>
                <section className="container">
                <h1 className="large text-primary">Log in</h1>
                <p className="lead"><i className="fas fa-user"></i>Login to Your Account</p>
                <form className="form" onSubmit={onSubmit}>
                    
                    <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email"  onChange= {OnChange}/>
                    
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        onChange= {OnChange}
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        onChange= {OnChange}
                    />
                    </div>
                    <input type="submit" onSubmit = {onSubmit} className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Not have an account? <Link to="/register">Sign In</Link>
                </p>
                </section>
            </body>
        </Fragment>
    )
}
