const express = require('express')

const auth = require('../../middleware/authMiddleware')
const Profile = require('../../models/Profile')
const router = express.Router()

const { check, validationResult} = require('express-validator/check')

const profile = require('../../models/Profile')

const User = require('../../models/User')
// @route GET api/profile/me
// @desc get current user
// @access Private
router.get('/me', auth, async (req,res) =>{

    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name','avatar'])

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
router.post('/',[auth, [check('status','status is required').not().isEmpty(),
], check('skills','skills are required').not().isEmpty()], auth, async (req,res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name','avatar'])

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

module.exports = router


