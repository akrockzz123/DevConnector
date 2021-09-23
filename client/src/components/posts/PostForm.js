import React from 'react'

import Moment from 'react-moment'

import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useState } from 'react'

import { useDispatch } from 'react-redux'

import { addPost } from '../../Actions/post'


const PostForm = () => {

    const dispatch = useDispatch()

    const [text,setText] = useState('')

    return (
        <div>
            <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={(e) => {
            e.preventDefault()
            dispatch(addPost(text))
            setText('')
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

     </div>
    )
}


export default PostForm
