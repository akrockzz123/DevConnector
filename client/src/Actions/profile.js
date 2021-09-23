import axios from "axios";

import { SetAlert } from "./alertAction";

import { GetUser } from "./auth";
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS
}
from '../constants/types'

import setAuthToken from "../utils/setAuthToken";

export const getCurrentProfile = () => async dispatch => {
    try {
        if(localStorage.token)
        setAuthToken(localStorage.token)


        const res = await axios.get('/api/profile/me');
        console.log("it works",res)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(GetUser())
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response}
        });
        dispatch(GetUser());
    }
}

//create or update profile

export const createProfile = (formData,history,edit = false) => async dispatch => {
    try {
      
        if(localStorage.token)
        setAuthToken(localStorage.token)

        

        const res = await axios.post('/api/profile',formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

       // dispatch(GetUser())

        dispatch(SetAlert(edit ? 'Profile Updated' : 'Profile Created','success'))

        if(!edit) {
            history.push('/dashboard')
        }


    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText,status:err.response.status}
        });
    }
}


// add experience

export const addExperience = (formData,history,edit = true) => async dispatch => {
    try {
      
        if(localStorage.token)
        setAuthToken(localStorage.token)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        

        const res = await axios.put('/api/profile/experience',formData,config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

       // dispatch(GetUser())

        dispatch(SetAlert(edit ? 'Experience added' : 'Profile Created','success'))

        
        history.push('/dashboard')


    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText,status:err.response.status}
        });
    }
}

// add education

export const addEducation= (formData,history,edit = true) => async dispatch => {
    try {
      
        console.log("addeducation")
        if(localStorage.token)
        setAuthToken(localStorage.token)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        

        const res = await axios.put('/api/profile/education',formData,config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

       // dispatch(GetUser())

        dispatch(SetAlert(edit ? 'Education added' : 'Profile Created','success'))

        
        history.push('/dashboard')


    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText,status:err.response.status}
        });
    }
}


// delete experiences

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data
        });
        dispatch(SetAlert('Experience deleted','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response.status}
        })
    }
}


//delete education


export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data
        });
       dispatch(getCurrentProfile())
        dispatch(SetAlert('Experience deleted','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response}
        })
    }
}


//delete account and profiel


export const deleteAccount = () => async dispatch => {

    if(window.confirm('Are you sure . This can not be undone'))
    {
        try {
            const res = await axios.delete('/api/profile/');
    
            dispatch({
                type: 'CLEAR_PROFILE',
            });

            dispatch({
                type: 'DELETE_ACCOUNT'
            })
            dispatch(SetAlert('Your Account has been permanently deleted','success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response,status:err.response.status}
            })
        }
    }
    
}

//Get all Profiles

export const getProfiles = () => async dispatch => {

        try {
           
            const res = await axios.get(`/api/profile`);
    
            dispatch({
                type: 'GET_PROFILES',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response,status:err.response}
            })
        }

    
}

//Get all profile by id

export const getProfileById = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/${userId}`);

        dispatch({
            type: 'GET_PROFILE',
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response}
        })
    }


}


//get github repos



//Get all profile by id

export const getGithubRepos = username => async dispatch => {

    console.log(username)
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: 'GET_REPOS',
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response}
        })
    }


}



