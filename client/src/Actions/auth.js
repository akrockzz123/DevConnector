import axios from "axios";

import { SetAlert } from "./alertAction";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from '../constants/types'

import setAuthToken from "../utils/setAuthToken";

//Register user
export const RegisterUser = ({name,email,password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})

    try {
        const res = await axios.post('/api/users',body,config)
        console.log(res.data.token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        });

        dispatch(SetAlert('User registered','success'));

        dispatch(GetUser())
    }catch(err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(SetAlert(error,'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const GetUser = () => async dispatch => {

    if(localStorage.token != null)
    setAuthToken(localStorage.token)

    //const body = JSON.stringify({name,email,password})

    try {
        const res = await axios.get('/api/auth')
        console.log(res.data)//
        localStorage.setItem('userdata',JSON.stringify(res.data))
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        //dispatch(SetAlert('User registered','success'));

    }catch(err) {
        localStorage.removeItem('userdata')
                dispatch({
            type: AUTH_ERROR
        });
    }
}

//login action

export const LoginAction = (email,password) => async dispatch => {
    if(localStorage.token)
    setAuthToken(localStorage.token)

    const body = JSON.stringify({email,password})

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {

        
        const res = await axios.post('/api/auth',body,config)
        console.log(res.data)//
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(GetUser())
        //dispatch(SetAlert('Login Successful','success'));

    }catch(err) {
        const errors = err.response.data.errors;

        
                dispatch({
            type: USER_LOGIN_FAIL
        })
        dispatch(SetAlert('password invalid','danger'))
        //dispatch(GetUser())
    }
}

export const Logout = () => dispatch => {

    localStorage.removeItem('token')
    localStorage.removeItem('userdata')
    dispatch({type: LOGOUT});
    //dispatch({type: CLEAR_PROFILE})
    //dispatch(GetUser())
}
