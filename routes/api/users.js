
const User  =  require('../../models/User')

const gravatar = require('gravatar')

const express = require('express')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { check, validationResult} = require('express-validator/check')

const config  = require('config')

const router = express.Router()



// @route POST api/users
// @desc REGISTER route
// @access Public
router.post('/',[ check('name','Name is required').not().isEmpty(),
check('email', 'Please include a valid email').isEmail(),
check('password','Please enter password with 6 lengths').isLength({ min: 6})
], async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    
    try {

        let user = await User.findOne({ email})

        if(user) {
            res.status(400).json({ errors: [{ msg : 'User already exist '}]}) 
        }


        
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm' //default if user doesnot have a gravatar
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })
       
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)
        
        console.log(user)
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        var tok = null;
        jwt.sign(payload,config.get('jwtSecret'),{ // create jsonweb token
            expiresIn: 360000
        },
          (err,token) => {
            if(err)
            throw err
            else
            {
                console.log({token})
                res.json({token})
            }
           
           
          }
        );

        //res.send(tok)

        // Return jsonwebtoken
    } catch(err) {

        console.log(err.message)
        res.status(500).send('Server error')
    }
})


// @route POST api/users
// @desc REGISTER route
// @access Public
router.get('/',[ 
check('email', 'Please include a valid email').isEmail(),
check('password','Please enter password with 6 lengths').isLength({ min: 6})
], async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password } = req.body
    
    try {

        let user = await User.findOne({ email})

        if(user && user.matchPassword(password))
        {
            const payload = {
                user: {
                    id: user.id
                }
            }
            const toke = jwt.sign(payload,config.get('jwtSecret'), {
                expiresIn: '30d'
            })
            res.json({
                _id: user._id,
                name:user.name,
                email: user.email,
                token: toke,
            })
        }
        else{
            res.status(401).json({error: 'Password is InCorrect'})
        }
        // Return jsonwebtoken
    } catch(err) {

        console.log(err.message)
        res.status(500).send('Server error')
    }

    

})

module.exports = router

