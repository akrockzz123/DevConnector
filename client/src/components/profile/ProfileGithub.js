import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import Moment from 'react-moment'

import { getGithubRepos } from '../../Actions/profile'

 const ProfileGithub = ({ username }) => {

    const dispatch = useDispatch()

    const {repos} = useSelector(state => state.profile)
    
    useEffect(() => {
        dispatch(getGithubRepos(username))
    },[getGithubRepos])
    return (
        <div className="profile-github containe" style={{width: '50%'}}>
            <h2 className='text-primary my-1'>Github Repos</h2>
            {repos === null ? (<div>You have no repositry</div>) : (
                repos.map((repo) => (
                    <div key = {repo._id} className='repo bg-white my-1 p-1'>
                        <div>
                            <h4>
                                <a href={repo.html_url} target='_blank' rel ='noopener noreferrer'>
                                    {repo.name}
                                </a>
                            </h4>
                        </div>
                        <div>
                            <ul>
                                
                                <li  className='badge badge-primary'>
                                        Stars: {repos.stargazers_count}
                                </li>
                                <li  className='badge badge-dark'>
                                    watchers: {repos.watchers_count}
                                </li>
                                <li  className='badge badge-light'>
                                    Forks: {repos.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                ))
            )}
        </div>
    )
}

export default ProfileGithub
