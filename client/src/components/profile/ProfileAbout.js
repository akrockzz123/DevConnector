import React, { Fragment } from 'react'

import { useSelector } from 'react-redux'
export const ProfileAbout = ({profile: {
    bio,
    skills
}}) => {

    const {user} = useSelector(state => state.loginAuth)

    const name = user.name
    return (
        <div>
        <div class="profile-about bg-light p-2">
          {bio && (
              <Fragment>
                  <h2 class="text-primary">{name}'s Bio</h2>
                    <p>
                        {bio}
                    </p>
              </Fragment>
          )}
          </div>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            <div class="p-1"><i class="fa fa-check"></i> HTML</div>
            <div class="p-1"><i class="fa fa-check"></i> CSS</div>
            <div class="p-1"><i class="fa fa-check"></i> JavaScript</div>
            <div class="p-1"><i class="fa fa-check"></i> Python</div>
            <div class="p-1"><i class="fa fa-check"></i> C#</div>
          </div>
        </div>
        
    )
}
