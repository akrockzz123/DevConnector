
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        friends: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }
        ],
    }
);



 module.exports   = User = mongoose.model('User', userSchema)