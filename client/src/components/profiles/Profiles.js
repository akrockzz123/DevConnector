import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'

import { Fragment } from 'react'

import {getProfiles} from '../../Actions/profile'

import {addFriend} from '../../Actions/allFriend'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import ProfileItem from './ProfileItem'

import setAuthToken from "../../utils/setAuthToken";

import { getPost } from '../../Actions/post'

import { myFriend } from '../../Actions/allFriend'

export const Profiles = ({match}) => {

    const dispatch = useDispatch();

  


    const [show,setShow] = useState(false)

    
    //const user = JSON.parse(localStorage.getItem('userdata'))




    
    useEffect(() => {
       
        dispatch(getProfiles())
        dispatch(myFriend())
        //setData(profiles)
        //dispatch({type: 'CLEAR_PROFILE'})
    },[getProfiles,myFriend]);

    
    const profileData = useSelector(state => state.profile)

    const { profiles, loading } = profileData

    const { allfriend } = useSelector(state => state.Friends)

    const farray = []

    console.log(show)
   
    const showFriend = () => {
        console.log(show)
        setShow(!show)

    }
    const link1 = (
        profiles.map((prof,index) => {

            var found = 0;

            
            var shows = show
            console.log(typeof(prof.user),"hey2")

            var idfriend = null;

            allfriend.map(f => {
               
                if(f.user === prof.user)
                {
                    found =1;

                    //break;
                }
            })
            if(found)
            {
                return  <div><ProfileItem id={index} data = {prof} show = {true} userFriendId = {prof.user}/></div>
                
               
            }
            
        })
    );


    const link2 = (
        profiles.map((prof,index) => {

            
            var found = 0;

            
            var shows = show
            console.log(typeof(prof.user),"hey2")
            allfriend.map(f => {
               
                if(f.user === prof.user)
                {
                    found =1;
                    //break;
                }
            })
            if(found == 0)
            {
                return  <div><ProfileItem id={index} data = {prof} show = {show}/></div>
                
               
            }
           
            
        
                
            
        })
    );
    
    return (
        <Fragment>

            { !loading &&

           
            (<div className="container">
                
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connect'></i>
                </p>
                
                 <button onClick={showFriend} style = {{marginBottom : '10px', padding: '3px'}}>{show == false ? (<div> click me to show friends</div>) : ( <div>click me to show Non friends</div>)}</button>
                 
                 {show === true ? link1 : link2}
                
            </div>)}
        </Fragment>
       
    );
}
