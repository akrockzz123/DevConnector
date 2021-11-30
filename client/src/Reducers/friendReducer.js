import {ADD_FRIEND,REMOVE_FRIEND,SHOW_FRIEND} from '../constants/types'


const initialState = {
    allfriend : [],
    loading: true,
    error: {}
}

export const Friend = (state= initialState,action) => {
    const { type, payload} = action;


    switch(type) {

        case ADD_FRIEND:

        return {
            ...state,
            allfriend: payload,
            loading:false
        };
        break;
        case REMOVE_FRIEND:
            return {
                ...state,
                allfriend: action.payload,
                loading: false
            };
        break;
        case SHOW_FRIEND:
            return {
                ...state,
                allfriend: action.payload,
                loading: false
            }
       
        default:
            return state;
    }
}

