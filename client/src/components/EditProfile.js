import React from 'react'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useState } from 'react'
import { Fragment } from 'react'

import { createProfile,getCurrentProfile } from '../Actions/profile'

import {Link,withRouter} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import setAuthToken from "../utils/setAuthToken";

export const EditProfile = ({history}) => {

  const dispatch = useDispatch()

  const profileinfo = useSelector(state => state.profile)

  useEffect(() => {

    getCurrentProfile()
    setFormData({
      company: profileinfo.loading || !profileinfo.profile.company ? '' : profileinfo.profile.company,
      website: profileinfo.loading || !profileinfo.website ? '' : profileinfo.website,
      location: profileinfo.location || !profileinfo.location ? '' : profileinfo.location,
      status : profileinfo.loading || !profileinfo.status ? '': profileinfo.status,
      skills : profileinfo.loading || !profileinfo.skills ? '' : profileinfo.skills,
      githubusername: profileinfo.loading || !profileinfo.githubusername ? '' : profileinfo.githubusername,
      bio : profileinfo.loading || !profileinfo.bio ? '' : profileinfo.bio,
      twitter : profileinfo.loading || !profileinfo.twitter ? '' : profileinfo.twitter,
      facebook : profileinfo.loading || !profileinfo.facebook ? '' : profileinfo.facebook,
      linkedin : profileinfo.loading || !profileinfo.linkedin ? '' : profileinfo.linkedin,
      youtube : profileinfo.loading || !profileinfo.youtube ? '' : profileinfo.youtube,
      instagram : profileinfo.loading || !profileinfo.instagram ? '' : profileinfo.instagram,
    });
  },[profileinfo.loading])
    const [formData,setFormData] = useState({
        company: '',
          website: '',
          location: '',
          status: '',
          skills: '',
          bio: '',
          githubusername:'',
          twitter:'',
          facebook: '',
          linkedin: '',
          youtube: '',
          instagram: '',
    });

    const [displaySocialInputs,setDisplaySocialInputs] = useState(false)

    const {
        company,
          website,
          location,
          status,
          skills,
          bio,
          githubusername,
          twitter,
          facebook,
          linkedin,
          youtube,
          instagram
    } = formData

    const toggleSocialInputs = () => {
        setDisplaySocialInputs(!displaySocialInputs)
    }

    const onSubmit = (e) => {
      e.preventDefault();
      console.log("you pressed",formData)
      dispatch(createProfile(formData,history,true))
    }

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value})
    return (
        <div>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value = {status} onChange= {(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange= {(e) => onChange(e)}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange= {(e) => onChange(e)}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange= {(e) => onChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange= {(e) => onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange= {(e) => onChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange= {(e) => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick = {() => toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
            <Fragment>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange= {(e) => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange= {(e) => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange= {(e) => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange= {(e) => onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange= {(e) => onChange(e)}/>
                    </div>
                    <input type="submit" className="btn btn-primary my-1"  />
                    <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
             
            </Fragment>
        )}
      </form>
     </div>
    )
}
