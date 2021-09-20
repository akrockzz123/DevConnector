import React from 'react'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Redirect } from 'react-router'
export const  Landing = () => {

    const isAuth = useSelector(state => state.userInfo)

    if(localStorage.getItem('token') !== null)
    {
        return <Redirect to='/dashboard'/>
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Developer Connector</h1>
                <p className="lead">
                Create a developer profile/portfolio, share posts and get help from
                other developers
                </p>
                <div className="buttons">
                    <Link to="/register" class="btn btn-primary">Sign Up</Link>
                    <Link to="/login" class="btn btn-light">Login</Link>
                </div>
            </div>
            </div>
      </section>
    )
}
