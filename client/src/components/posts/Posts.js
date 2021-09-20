import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { addPost, getPosts } from '../../Actions/post'

import setAuthToken from "../../utils/setAuthToken";


import PostItem from './PostItem'

import PostForm from './PostForm'
const Posts = () => {

    const dispatch = useDispatch()

    const {posts} = useSelector(state => state.postReducer)
    useEffect(() => {
        dispatch(getPosts())
    }, [getPosts]);


    return (
        <div className="post">
              <h1 className='large text-primary'>POsts</h1>
              <p>
                <i className="fas fa-user"></i>Welcome to the community
              </p>
              <PostForm/>
              <div className="post">
                  {posts.map((post) => (
                      <PostItem key={post._id} post={post} />
                  ))}
              </div>
        </div>
    )
}


export default Posts
