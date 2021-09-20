import React from 'react'

import { addComment } from '../../Actions/post'

import { deleteComment } from '../../Actions/post'

import { useSelector } from 'react-redux'

import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { useState } from 'react'
const CommentForm = ({postId}) => {

    const dispatch = useDispatch()

    const [text,setText] = useState('')

    return (
        <div class="post-form">
            <div className='bg-primary p'>
                <h3>Leave a comment</h3>
            </div>
            <form className='form my-1' onSubmit={(e) => {
                e.preventDefault();
                dispatch(addComment(postId,{text}))
                
            }}>
                <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                value={text}
            onChange={(e) => setText(e.target.value)}
            ></textarea>
             <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
            
        </div>
    )
}




export default CommentForm
