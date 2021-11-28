const express = require('express')

const router = express.Router()

const { check, validationResult } = require('express-validator/check')
const { ValidationHalt } = require('express-validator/src/base')

const Post = require('../../models/Post')

const Profile = require('../../models/Profile')

const User = require('../../models/User')

const auths = require('../../middleware/authMiddleware')

// @desc Tset route
// @access Private

//console.log("Hey just checking")




// @route DELETE api/posts/liked
// @desc  unlike to post by user
// @access Private

router.delete('/:id',auths,async (req,res) => {

    const errors = validationResult(req)

    try{
        const user = await User.findById(req.user.id).select('-password')

     console.log(user)
        //check if the post is already liked by user

        if(user.friends.filter(like => like.user.toString() == req.params.id).length === 0)
        {
            return res.json(400).json({msg: "already friend removed"})
        }

        // removing index of user from like

        const removeIndex = user.friends.map(like => like.user.toString()).indexOf(req.params.id)

        user.friends.splice(removeIndex,1)


        await user.save()

        res.json(user)


    }catch(err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
});


router.post('/:id',auths, async (req,res) => {
    const errors = validationResult(req)

    ObjectId = require('mongodb').ObjectID;

    try{
        
    
         const user = await User.findById(req.user.id).select('-password')


        const {name, email} = user

        console.log(user)
        //console.log(typeof(req.user.id),"heyyyy")
        //check if the post is already liked by user

        if(user.friends.filter(f => f.user.toString() == req.params.id).length > 0)
        {
            return res.json(400).json({msg: "Already friend"})
        }

        //str = JSON.parse(req.params.id)

        user.friends.unshift({user: req.params.id})

        await user.save()

        //const str = CircularJSON.stringify(user);

       // console.log(typeof(req.user.id),req.user.id)

        res.json(user)

    }catch(err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
});


module.exports = router ;