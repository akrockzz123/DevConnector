const express = require('express')

const router = express.Router()

const { check, validationResult } = require('express-validator/check')
const { ValidationHalt } = require('express-validator/src/base')

const Post = require('../../models/Post')

const Profile = require('../../models/Profile')

const User = require('../../models/User')

const auth = require('../../middleware/authMiddleware')

// @route POST api/posts
// @desc Tset route
// @access Private
router.post('/',auth, async (req,res) => {
    const errors = validationResult(req)

   
    try{

        const user = await User.findById(req.user.id).select('-password')

        const newPost  = new Post({
            text: req.body.text,
            name: user.name,
            user:req.user.id,
            avatar: user.avatar

        })

        console.log(newPost)
        const post = await newPost.save()

        res.json(post)

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
});

// @route GET api/posts
// @desc Tset route
// @access Private

router.get('/',auth, async (req,res) => {
    try {

      

        
          console.log(req.query.keyword)
          if(req.query.keyword === "")
          {
              posts = await Post.find({ }).sort({ date: -1})
          }
          else
          {
            posts = await Post.find({'name' : req.query.keyword}).sort({ date: -1})
          }
        //const posts = req.params.keyword !== "" ? await Post.find({'name' : req.params.keyword}).sort({ date: -1}) :  await Post.find({ }).sort({ date: -1})
       // const posts = 
       
        res.json(posts)
    }catch(err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})


// @route DELETE api/posts/liked
// @desc add like to post by user
// @access Private

router.put('/like/:id',auth,async (req,res) => {

    try{
        const post = await Post.findById(req.params.id)

     console.log(post)
        //check if the post is already liked by user

        if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0)
        {
            return res.json(400).json({msg: "Post already liked"})
        }

        post.likes.unshift({user: req.user.id})

        await post.save()

        res.send("Post liked")


    }catch(err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})

// @route DELETE api/posts/liked
// @desc  unlike to post by user
// @access Private

router.put('/unlike/:id',auth,async (req,res) => {

    try{
        const post = await Post.findById(req.params.id)

     console.log(post)
        //check if the post is already liked by user

        if(post.likes.filter(like => like.user.toString() == req.user.id).length === 0)
        {
            return res.json(400).json({msg: "Post already not liked"})
        }

        // removing index of user from like

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex,1)


        await post.save()

        res.send("Post unliked")


    }catch(err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})
    
// @route GET api/posts/:id
// @desc get post by id
// @access Private

router.get('/:id',auth, async (req,res) => {
    try {
        const posts = await Post.findById(req.params.id)

        if(!posts)
        {
            return res.status(404).json({msg: "Post not found"})
        }
        res.json(posts)
    }catch(err) {
        if(err.kind === 'ObjectId')
        {
            return res.status(404).json({msg : "Post not found"})
        }
        console.log(err.message)
        res.status(500).send("server error")
    }
})

// @route DELETE api/posts/:id
// @desc delete post by id
// @access Private

router.delete('/:id',auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        // user who created post will only delete the post

        if(!post)
        {
            return res.status(404).json({msg: "Post not found"})
        }

        if(post.user.toString() !== req.user.id )
        {
            return res.status(401).json({msg: "User not authorized"})
        }

        await post.remove();

        res.json({msg : "Post removed"})
    }catch(err) {
        if(err.kind === 'ObjectId')
        {
            return res.status(404).json({msg : "Post not found"})
        }
        console.log(err.message)
        res.status(500).send("server error")
    }
})

// @route POST api/posts/comment/:id
// @desc comment on a post
// @access Private
router.post('/comment/:id', auth, async (req,res) => {
        const errors = validationResult(req)
    
        if(!errors.isEmpty()) {
            return res.status(400).json({errrors: errors.array() })
        }
    
        try{
    
            const user = await User.findById(req.user.id).select('-password')


            const post = await Post.findById(req.params.id)

            const newComment  = {
                text: req.body.text,
                name: user.name,
                user:req.user.id,
                avatar: user.avatar
    
            }

            post.comments.unshift(newComment)
    
            const newpost = await post.save()
    
            res.json(newpost)
    
        }catch(err){
            console.log(err.message)
            res.status(500).send("Server Error")
        }
    });

    // @route POST api/posts/comment/:id:comment_id
    // @desc deleting comment
    // @access Private

    router.delete('/comment/:id/:comment_id',auth,async(req,res) => {
        try{
            const post = await Post.findById(req.params.id)

        // user who created post will only delete the post

        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if(!comment){
            return res.status(404).json({msg: 'Comment not present'})
        }

        if(comment.user.toString() != req.user.id)
        {
            return res.status(401).json({msg: "User not authorized"})
        }

        const removeIndex = post.comments.map(post => post.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex,1)


        await post.save()

        res.send(post.comments)

        }catch(err){

        }
    });
module.exports = router

