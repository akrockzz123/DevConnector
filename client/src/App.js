import React, {Fragment } from 'react'

import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import './App.css';

import Navbar from './components/layout/Navbar';

import { Landing } from './components/layout/landing';

import Register from './components/Register';

import { Login } from './components/Login'

import Alert from './components/layout/Alert';

import { GetUser } from './Actions/auth';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

import Dashboard from './components/Dashboard/Dashboard';

import { PrivateRoute } from './components/routing/PrivateRoute';

import { CreateProfile } from './components/CreateProfile';

import { EditProfile } from './components/EditProfile';

import {AddEducation} from './components/AddEducation';

import {AddExperience} from './components/AddExperience'

import Profile from './components/profile/Profile';

import { Profiles } from './components/profiles/Profiles';

import Posts from './components/posts/Posts';

import Post from './components/post/Post'

if(localStorage.token)
{
  setAuthToken(localStorage.token)
}
 const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetUser())
  },[])

  return (
    
      <div className="App">
        <Fragment>
        
            <Router>
              <Navbar/>
              <Route exact path='/' component= {Landing} />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </Router>
        </Fragment>
      </div>
  );
}

export default App;
