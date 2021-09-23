import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

import { SetAlert } from "./alertAction";

import {
   GET_POSTS,
   POST_ERROR,
   UPDATE_LIKES,
   DELETE_POST,
   ADD_POST,
   GET_POST,
   ADD_COMMENT,
   REMOVE_COMMENT
} from '../constants/types';

export const getPosts = (keyword='') => async dispatch => {
    try {

      const res = await axios.get(`/api/posts?keyword=${keyword}`)

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
        
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};


export const addLikes = (postId) => async dispatch => {
    try {

        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        });
        dispatch(getPosts())
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};


export const addPost = (formData) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const res = await axios.post('/api/posts',formData,config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(getPosts())
        dispatch(SetAlert('Post created','success'));

    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};




export const removeLikes = (postId) => async dispatch => {
    try {

        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        });
        
        dispatch(getPosts())
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};


export const deletePost = (postId) => async dispatch => {
    try {

        const res = await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: {postId}
        });
       
        dispatch(getPosts())
        dispatch(SetAlert('Post removed','success'))
      
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};





export const addComment = (postId,formData) => async dispatch => {
    try {

        //const formData = JSON.stringify(formData)
        setAuthToken(localStorage.getItem('token'))
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        
        dispatch(SetAlert('Comment Addded','success'))
        dispatch(getPost(postId))
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};


export const deleteComment = (id,comment_id) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.delete(`/api/posts/comment/${id}/${comment_id}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: comment_id
        });
        
        dispatch(SetAlert('Comment Addded','success'))
        dispatch(getPost(id))
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};


export const getPost = (id) => async dispatch => {
    try {

        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
        
    }catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response,status:err.response}
        });
    }
};