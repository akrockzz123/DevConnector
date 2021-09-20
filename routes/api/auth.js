const express = require('express')

const router = express.Router()

const auths = require("../../middleware/authMiddleware")

const User = require('../../models/User')

const config  = require('config')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const { check, validationResult} = require('express-validator/check')


// @route post api/auth
// @desc Tset route
// @access Public
router.get('/', auths,async (req,res) => {

    try {

        const user = await User.findById(req.user.id).select('-password')

        res.json(user)

    } catch(err) {

        console.log(err.message)

        res.status(500).send('Server error')

    }
    //res.send('Auth Route')
})


// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post('/',[ 
check('email', 'Please include a valid email').isEmail(),
check('password','Please enter password with 6 lengths').isLength({ min: 6})],async (req,res) => {

    const {email, password } = req.body

    try {

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({ errors: [{ masg: 'User already exists Invalid credentials'}]})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch)
        {
            return res.status(400).json({ errors: [{ masg: 'Password not matched'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{ // create jsonweb token
            expiresIn: 360000
        },
          (err,token) => {
              if(err)
              throw err

              console.log(token)
              res.json({ token })

           // console.log(token)
          }
        );

        

    } catch(err) {

        console.log(err.message)

        res.status(500).send('Server error')

    }
    //res.send('Auth Route')
})


module.exports = router

