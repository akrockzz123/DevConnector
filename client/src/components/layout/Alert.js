import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { connect } from 'react-redux';
import { afterWrite } from '@popperjs/core';

import { useEffect,useState } from 'react';

import { Alert } from 'react-bootstrap';

const Alerts = () => {

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
        { messg.map((mess,idx) => (
                (<Alert key={idx} variant={mess.alertType}>
                    {mess.msg}             
                </Alert>
            )))                         
    }
    </div>
);

}

export default Alerts;