import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT
} from '../constants/types'

const initialState = {
    token: localStorage.getItem('token') !== null ? localStorage.getItem('token'): null,
    isAuthenticated:  localStorage.getItem('token') !== null ? 'true' : 'false',
    loading:  localStorage.getItem('token') !== null ? 'false' : 'true',
    user: localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('userdata')) : null
}


export const UserAuthReducer = (state = initialState, action) => {

    switch(action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            }
        break;
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading:false
            }
        break;
        case USER_LOGIN_SUCCESS:
            console.log(action.payload.token)
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                token:action.payload,
                isAuthenticated: true,
                loading:false
            }
        break;
        case USER_LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading:false
            }
        break;

        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userdata')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading:false
            }
            
        default:
            return initialState;
    }
}