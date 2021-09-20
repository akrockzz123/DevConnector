import { GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,UPDATE_PROFILE,GET_PROFILES,GET_REPOS } from "../constants/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export const Profile = (state= initialState,action) => {
    const { type, payload} = action;


    switch(type) {

        case UPDATE_PROFILE:

        return {
            ...state,
            profile: payload,
            loading:false
        };
        break;
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        break;
        case GET_PROFILE:
        return {
            ...state,
            profile: action.payload,
            loading:false,
            error: null
        }

        break;
        case PROFILE_ERROR:

            return {
                ...state,
                error: action.payload,
                loading: false
            }

        break;
        case GET_REPOS:

            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        break;
        case CLEAR_PROFILE:
            localStorage.removeItem('token')
            localStorage.removeItem('userdata')
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
                error: null
            }
        break;
        default:
            return state;
    }
}