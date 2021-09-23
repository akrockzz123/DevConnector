import { SET_ALERT,REMOVE_ALERT } from "../constants/types";

import { v4 as uuidv4 } from 'uuid';

const SetAlert = (msg,alertType) => (dispatch) => {
    const id =  uuidv4()

    dispatch({
        type: SET_ALERT,
        payload: { msg,alertType,id}
    });
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: {id}
        })
    },2500)
    
};

export {SetAlert}