import axios from "axios";

import { SetAlert } from "./alertAction";
import {
   ADD_FRIEND,
   REMOVE_FRIEND,
   SHOW_FRIEND,
   PROFILE_ERROR
} from '../constants/types';


export const deleteFriend = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/friends/${id}`);

        dispatch({
            type: 'REMOVE_FRIEND',
            payload: res.data
        });
        dispatch(SetAlert('friend removed','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response.status}
        })
    }
}

export const addFriend = id => async dispatch => {
    try {
        const res = await axios.post(`/api/friends/${id}`);

        dispatch({
            type: 'ADD_FRIEND',
            payload: res.data
        });
        dispatch(SetAlert('friend added','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response.status}
        })
    }
}

export const myFriend = () => async dispatch => {

    try {

        const res = await axios.get(`/api/friends`);

        dispatch({
            type: 'SHOW_FRIEND',
            payload: res.data
        })

    } catch(err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response,status:err.response.status}
        })
    }
}