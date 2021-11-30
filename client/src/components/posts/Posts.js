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

import { Row,Col} from 'react-bootstrap'
const Posts = ({match}) => {
    const dispatch = useDispatch()

    const keyword = match.params.keyword

    const [friend,setFriend] = useState(false)

    const {posts} = useSelector(state => state.postReducer)
    useEffect(() => {
        dispatch(getPosts(keyword))
    }, [getPosts]);

    const showFriend  = () => {
        setFriend(!friend)
    }
    return (
        <>
        <input type="checkbox" onClick = {showFriend} data-toggle="toggle" data-onstyle="outline-info" data-offstyle="outline-light"></input>
        <div className="container">
        <h1 className='large text-primary'>POSTS</h1>
              
              
              <div style={{marginBottom: "10px"}}>
                <i className="fas fa-user"></i>Welcome to the community
              </div>
            
              <div> <PostForm/></div>
             
             <div>
             <Row>
                 
                
                 {posts.map((post) => (
                         <Col sm={12} md={6} lg={4} xl={3} >
                             <PostItem key={post._id} post={post} friend = {friend} />
                         </Col>
                         
                     ))}
               </Row>
             </div>
        </div>
            
              
              
        </>
    )
}


export default Posts