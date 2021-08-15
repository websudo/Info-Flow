const express = require('express');
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000
const db = process.env.MONGODB_URI

app.use(express.json())

MongoClient.connect(db , () => {console.log("hello")})
/*.then( () => { console.log( "Database Connected")})
.catch( err => { console.err })*/

app.listen( port , ()=>{
    console.log( `Server started at ${port}`)
})
