import { SET_ALERT,REMOVE_ALERT } from "../constants/types";


const SetAlert = (msg,alertType) => (dispatch) => {
    const id = "1234"

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