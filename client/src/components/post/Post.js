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

import CommentItem from './CommentItem'

 const Post = ({match}) => {

    const dispatch = useDispatch()

    const {post} = useSelector(state => state.postReducer)

    useEffect(() => {
        dispatch(getPost(match.params.id))
    },[getPost])
    return (
        <div className="container">
            {post !== null && (
                
                <PostItem post ={post} showActions='false'/>,
                <div className="comments">
                     {post.comments.map(comment => (
                    <CommentItem key ={comment._id} postId = {post._id} comment = {comment}/>
                ))}
                </div>
               
            )}
        </div>
    ); 
}

export default Post

