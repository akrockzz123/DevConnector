import React, { Fragment } from 'react'

import Moment from 'react-moment'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useState } from 'react'

import { useDispatch } from 'react-redux'

import ProfileExperience from '../profile/ProfileEducation'

import { addLikes,removeLikes } from '../../Actions/post'

import { deletePost } from '../../Actions/post'


import { post } from 'request'
 const PostItem = ({post,showActions}) => {

  console.log(showActions)
  const userdata = localStorage.getItem('userdata')

  const userData =JSON.parse(userdata)

  const userId = userData._id
  const {_id,user,avatar,name,text,date,comments,likes,unlikes} = post
  const {loading} = post
   if(!loading)
   {
    
    
   }
    const dispatch = useDispatch()

    return (
      <Fragment>
        { !loading && (
        <Fragment>
                <div class="posts">
                <div class="post bg-white p-1 my-1">
                  <div>
                    <Link to={`/profile/${user}`}>
                      <img
                        class="round-img"
                        src={avatar}
                        alt=""
                      />
                      <h4>{name}</h4>
                    </Link>
                  </div>
                  <div>
                    <p class="my-1">
                      {text}
                    </p>
                    <p class="post-date">
                        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {(showActions ==='true') && (
                      <Fragment>
                        <button type="button" class="btn btn-light" onClick={e => dispatch(addLikes(_id))}>
                          <i class="fas fa-thumbs-up"></i>
                          <span>{likes.length}</span>
                        </button>
                        <button type="button" class="btn btn-light"  onClick={e => dispatch(removeLikes(_id))}>
                          <i class="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} class="btn btn-primary">
                          Discussion {comments.length > 0 ? (<span clasName='comment-count'>{comments.length}</span>) : 0}
                        </Link>
                        {user == userId ? (
                          <button      
                          type="button"
                          class="btn btn-danger"
                          onClick={(e) => dispatch(deletePost(_id))}
                        >
                          <i class="fas fa-times"></i>
                        </button>
                        ) : null}
                      </Fragment>
                    )}
                  </div>
              </div>
            </div>
        </Fragment>)
      }
      {loading && <div>Loading....</div>}
      </Fragment>
      
    );
 }


 PostItem.defaultProps =  {
   showActions: 'true'
 };

export default PostItem
