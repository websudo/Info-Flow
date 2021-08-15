const express = require('express');
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

//import Routes
const authRoutes = require('./routes/auth')

// app 
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

//Routes Middleware
app.use( '/api' , authRoutes)


// Database
const MongoClient = mongodb.MongoClient
const db = process.env.MONGODB_URI

MongoClient.connect(db)
.then( () => { console.log( "Database Connected")})
.catch( err => { console.err })



const port = process.env.PORT || 5000
app.listen( port , ()=>{
    console.log( `Server started at ${port}`)
})
