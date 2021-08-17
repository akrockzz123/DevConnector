const { response } = require('express')
const express = require('express')

const app = express()

app.get('/', (req,res) => res.send('API is running on port 6000'))

const PORT = process.env.PORT || 6000

app.listen(PORT,() => console.log(`server running on port ${PORT}`) )
