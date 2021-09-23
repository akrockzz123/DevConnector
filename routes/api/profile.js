const express = require('express')

const auth = require('../../middleware/authMiddleware')
const Profile = require('../../models/Profile')
const router = express.Router()

const config = require('../../config/default.json')

const { check, validationResult} = require('express-validator/check')

const profile = require('../../models/Profile')

const request = require('request')

const Post = require('../../models/Post')

const User = require('../../models/User')
// @route GET api/profile/me
// @desc get current user
// @access Private
router.get('/me', auth, async (req,res) =>{

    try {
        console.log(req.user.id)
        const profile = await Profile.findOne({ user: req.user.id}).populate('users',['name','avatar'])

        console.log(profile)
        if(!profile)
        {
            res.status(400).json({msg: "There is no matching profile for this user"})
        }
        else
        {
            res.json(profile)
        }
    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// @route POST api/profile
// @desc create or update user profile
// @access Private
router.post(
'/',
auth, 
async (req,res) => {

    const errors = validationResult(req)

    console.log(req.body)
    //console.log(status)
    console.log("backend")
    if(!errors.isEmpty())
    {
        console.log("errors")
        return res.status(400).json({errors: errors.array()})
    }
    
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    // Build profile object

    const profileFields = {}

    profileFields.user = req.user.id

    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())

    }

    // Buidl social object

    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube

    if(twitter) profileFields.social.twitter = twitter

    if(facebook) profileFields.social.facebook = facebook

    if(linkedin) profileFields.social.linkedin = linkedin

    if(instagram) profileFields.social.instagram = instagram

    console.log(skills)

   try {

      let profile = await Profile.findOne({user: req.user.id})

      if(profile)
      {
          //update

          profile = await Profile.findOneAndUpdate({user: req.user.id},{
              $set : profileFields }

          
 , {
     new:true
 })
    res.json(profile)
      }
      else{
          profile = new Profile(profileFields)

          await profile.save()

          res.json(profile)
      }
   } catch(err) {
       console.log(err.message)
       res.status(500).send('Server error') 
   }

})

// @route GET api/profile
// @desc get all lists of profile
// @access Private

router.get('/', async (req,res) => {

    try{
        const keyword = req.params.keyword ? {

    
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          } : {}

          console.log(keyword)
        const profiles = await Profile.find({...keyword}).populate('User' , ['name', 'avatar'])

        res.send(profiles)
    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// @route GET api/profile/user/:user_id
// @desc get profile by user id
// @access Public

router.get('/:user_id', async (req,res) => {

    try{

        const profiles = await Profile.findOne({user: req.params.user_id}).populate('User' , ['name', 'avatar'])

        if(!profiles)
        {
            res.status(400).json({msg : "There is not profile for this user"})


        }
        res.send(profiles)
    } catch(err) {

        if(err.kind == 'ObjectId')
        {
            res.status(400).json({msg : "There is not profile for this user"})
        }
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// @route DELETE api/profile/user/:user_id
// @desc DELETE PROFILE,USER, AND POSTS
// @access Private

router.delete('/', auth,async (req,res) => {

    try{

        // remove user posts and profile

        await Post.deleteMany({user: req.user_id})
        await Profile.findOneAndRemove({user: req.user_id})

        await User.findOneAndRemove({_id: req.user.id})

        res.json({msg : 'User deleted'})
    } catch(err) {

        if(err.kind == 'ObjectId')
        {
            res.status(400).json({msg : "There is not profile for this user"})
        }
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

// @route PUT api/profile/education
// @desc add educaton
// @access Private

router.put('/education',auth,async (req,res) => {

    
        // remove user posts and profile
        console.log("backend")
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const {
            school,
            study,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body

        const newEdu= {
            school,
            study,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {

            const profile = await Profile.findOne({user: req.user.id})

            profile.education.unshift(newEdu)

            await profile.save()

            res.json(profile)
        } catch(err) {
            console.log(err.message)
            res.status(500).send('Server Error')
        }


    

        if(err.kind == 'ObjectId')
        {
            res.status(400).json({msg : "There is not profile for this user"})
        }
        console.log(err.message)
        res.status(500).send('Server error')
    
})


// @route DELETE api/profile/education/:edu_id
// @desc DELETE Education FROM PROFILE
// @access Private

router.delete('/education/:edu_id', auth,async (req,res) => {

    try {
        const profile = await Profile.findOne({user: req.user.id})

        //get remove index

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex,1)

        await profile.save()

        res.json({profile})

    } catch(err) {

        console.log(err.message)
        res.status(500).send('Server Error')
    }

        
    
})

// @route PUT api/profile/experience
// @desc add profile experience
// @access Private

router.put('/experience',[auth,[
    check('title','Title required').not().isEmpty(),
    check('company','Company required').not().isEmpty(),
    check('from','from date is required').not().isEmpty(),
]],async (req,res) => {

    
        // remove user posts and profile

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {

            const profile = await Profile.findOne({user: req.user.id})

            profile.experience.unshift(newExp)

            await profile.save()

            res.json(profile)
        } catch(err) {
            console.log(err.message)
            res.status(500).send('Server Error')
        }


    

        if(err.kind == 'ObjectId')
        {
            res.status(400).json({msg : "There is not profile for this user"})
        }
        console.log(err.message)
        res.status(500).send('Server error')
    
})


// @route DELETE api/profile/experience/:exp_id
// @desc DELETE EXPERIENCE FROM PROFILE
// @access Private

router.delete('/experience/:exp_id', auth,async (req,res) => {

    try {
        const profile = await Profile.findOne({user: req.user.id})

        //get remove index

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex,1)

        await profile.save()

        res.json({profile})

    } catch(err) {

        console.log(err.message)
        res.status(500).send('Server Error')
    }

        
    
})


// @route GET api/profile/github/:username
// @desc get user repos from github
// @access Public

router.get('/github/:username', (req,res) => {
    try {
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config['githubClientId']}&client_secret=${config['githubSecret']}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        request(options, (errors, response,body) => {
            if(errors) console.log(error)

            if(response.statusCode != 200)
            {
                return res.status(404).send({ msg : "No github profile found"})
            }

            res.json(JSON.parse(body))
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})





module.exports = router


