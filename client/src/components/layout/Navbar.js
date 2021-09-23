import React from 'react'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import { Logout } from '../../Actions/auth'

import { useState } from 'react'

import { Redirect } from 'react-router'

import { useEffect } from 'react'

import { GetUser } from '../../Actions/auth'

import SearchBox from '../SearchBox'

import { Route } from 'react-router'

const Navbar = ({history}) => {

    const dispatch = useDispatch()

    const logindata = useSelector(state => state.loginAuth)

    const isAuth = logindata.isAuthenticated

    const [auth,setAuth] = useState('')

    useEffect(() => {
       setAuth(logindata.isAuthenticated)
    }, [logindata.isAuthenticated])

    console.log("Navbar running")
    const logout = () => {
        console.log("logout")
        dispatch(Logout())
    }

    
    const authLinks = (
        <ul>
            <li>
            <Route render = {({ history }) => <SearchBox history = { history }/>} />
            </li>
            <li>
                <Link to="/profiles">Profile</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <Link to ='/dashboard' ><i className='fas fa-user'/>{' '}Dashboard</Link>
                <a onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-so">Logout</span>
                </a>
            </ul>
    )
    const guestLinks = (
        <ul>
            <li>
            <Route render = {({ history }) => <SearchBox history = { history }/>} />
            </li>
            <li>
                <Link to="/profiles">Profile</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            
        </ul>
    )


    console.log("navbar",auth)
    
    return (
        <div>
            <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i class="fas fa-code"></i> DevConnector</Link>
            </h1>
            {localStorage.getItem('token') !== null   ?  authLinks :  guestLinks}
            </nav>
        </div>
    )
    
}


export default Navbar