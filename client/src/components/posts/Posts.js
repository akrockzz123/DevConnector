import React from 'react'

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

import { useSelector } from 'react-redux'

const Posts = ({match}) => {
    const dispatch = useDispatch()

    const keyword = match.params.keyword

    const [friend,setFriend] = useState(false)

    const [showPostsOfFriend,setShowPostsOfFriend] = useState(false)

    const {posts} = useSelector(state => state.postReducer)

    console.log(showPostsOfFriend)
    useEffect(() => {
        dispatch(getPosts(keyword))
    }, [getPosts]);

    const showFriend  = () => {
        setFriend(!friend)
    }

    const {loaing,allfriend,error} = useSelector(state => state.Friends)

    const toggleFriendhandler = () => {

        setShowPostsOfFriend(!showPostsOfFriend)
    }

    const link1 = 
        ( posts.map((post) => {

            return (
                <Col sm={12} md={6} lg={4} xl={3} >
                <PostItem key={post._id} post={post} friend = {friend} showPostsOfFriend = {showPostsOfFriend} />
            </Col>
            );
            
            
            }));


            
    
   const link2 = ( posts.map((post) => {

    var found = 0;

    allfriend.map(f => {
               
        if(f.user === post.user)
        {
            found =1;

            //break;
        }
    })
    

    if(found == 1)
    {
        return (
            <Col sm={12} md={6} lg={4} xl={3} >
            <PostItem key={post._id} post={post} friend = {friend} />
        </Col>
        );
    }
    
    
    
    }));

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
                  
                <button style = {{ padding: '3px' , margin: '2px'}} onClick = {toggleFriendhandler}>{showPostsOfFriend == false ? 
                (<div>click to Show posts of only friend</div>) : (<div>click to Show all posts</div>)}</button>
                
                {showPostsOfFriend ? (link2) : (link1)},
               </Row>
             </div>
        </div>
            
              
              
        </>
    )
}


export default Posts