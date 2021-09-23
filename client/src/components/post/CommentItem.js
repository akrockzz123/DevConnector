import React from 'react'

import { Fragment } from 'react'

import Moment from 'react-moment'
import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { useState } from 'react'

import { Link } from 'react-router-dom'

import { deleteComment } from '../../Actions/post'

import { useDispatch } from 'react-redux'

 const CommentItem = ({postId,comment : {_id,text,name,avatar,user,date}}) => {

    const loginuser = JSON.parse(localStorage.getItem('userdata'))._id

    console.log(loginuser)
    const dispatch = useDispatch()
    return (
        <Fragment>
            <div class="post bg-white p-1 my-1">
                <div>
           -p-     <Link to={`/profile/${user}`}>
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
                </div>
                <div className='p-0.5'>
                    <span className='m-1'>comment date : </span><Moment format='YYYY/MM/DD'>{date}</Moment>
                </div>
                {loginuser === user ? (<button      
                          type="button"
                          class="btn btn-danger"
                          onClick={(e) => dispatch(deleteComment(postId,_id))}
                        >
                          <i class="fas fa-times"></i>
                        </button>
                        ) : null}
            </div>
        </Fragment>
    )
}


export default CommentItem
