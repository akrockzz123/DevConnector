import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { connect } from 'react-redux';
import { afterWrite } from '@popperjs/core';

import { useEffect,useState } from 'react';

const Alert = () => {

    const [messg, setMessg] = useState(Array);
    const alertData = useSelector(state => state.alert);

   console.log(alertData)

   useEffect(() => {
    if(alertData !== null && alertData.length !== null) {
        setMessg(alertData)
    }
}, [alertData])


return (
    <div>
        { messg.map((mess) => (
                (<div className={`alert alert-${mess.alertType}}`}>
                  {mess.msg}
                </div>
            )))
    }
    </div>
);
    
    
   
            
}


export default Alert;