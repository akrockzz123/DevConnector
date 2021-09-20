import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import {getPost} from '../../Actions/post'

import PostItem from '../posts/PostItem'
 const Post = ({match}) => {

    const dispatch = useDispatch()

    const {post} = useSelector(state => state.postReducer)
    useEffect(() => {
        dispatch(getPost(match.params.id))
    },[getPost])
    return (
        <div>
            {post !== null && (
                <PostItem post ={post} showActions='false'/>
            )}
        </div>
    ); 
}

export default Post

