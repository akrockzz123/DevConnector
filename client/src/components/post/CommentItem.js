import React from 'react'

import { Fragment } from 'react'


import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { useState } from 'react'

import { Link } from 'react-router-dom'

import { deleteComment } from '../../Actions/post'

import { useDispatch } from 'react-redux'

 const CommentItem = ({postId,comment : {_id,text,name,avatar,user,date}}) => {
    return (
        <Fragment>
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
                </div>
            </div>
        </Fragment>
    )
}


export default CommentItem
