const mongoose = require('mongoose')

const config = require('config')

const db = config.get('mongoURI')

console.log(db)


const connectDB = async () => {
    try {
        console.log('connecting....')
        await mongoose.connect(db, {
            useNewUrlParser: true
        })
        
        console.log("MongoDB connected .....")
    } catch(err) {
        console.log(err.message)

        // exit the process

        process.exit(1)
    }
}

module.exports = connectDB
