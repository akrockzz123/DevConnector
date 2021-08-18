const { response } = require('express')
const express = require('express')

const connectDB = require('./config/db')

const app = express()

// connect to the data base

connectDB()

app.get('/', (req,res) => res.send('API is running on port 6000'))

const PORT = process.env.PORT || 6000

app.listen(PORT,() => console.log(`server running on port ${PORT}`) )
