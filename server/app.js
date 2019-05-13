require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const PORT = 3000
const route = require('./routes/routes')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/miniWP',{ useNewUrlParser : true })

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(route)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})