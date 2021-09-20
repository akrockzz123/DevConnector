import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    DELETE_ACCOUNT
} from '../constants/types'

import setAuthToken from '../utils/setAuthToken'
import { useSelector } from 'react-redux'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') !== null ? 'true' : 'false',
    loading: localStorage.getItem('token') !== null ? 'false' : 'true',
    user: localStorage.getItem('token') !== null ? localStorage.getItem('userdata') : null
}


export const UserInfoReducer = (state = initialState, action) => {

 

    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                user:action.payload,
                isAuthenticated: true,
                loading:false
            }
        break;
        case AUTH_ERROR:
            //localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading:false
            }
        break;
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                
                loading:false
            }
        break;
        default:
            return initialState;
    }
}