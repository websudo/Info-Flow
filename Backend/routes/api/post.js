const express = require('express')
const router = express.Router()


/**
 * * IMPORTING THE POST MODEL FROM MODELS FOLDER
 */
const Post = require('../../models/Post')




/**
 * * POST METHOD FOR ADDING DATA TO THE DATABSE 
 */
router.post('/' , (req,res) =>{

    /** 
     * * GETTING THE BODY OF THE REQUEST RECIEVED 
     */
    const post = req.body;

    Post.create( post , (err , data) =>{
        if( err ){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})




/**
 * * GET METHOD FOR FETCHING THE DATA FROM THE DATABSE 
 */
router.get('/' , (req,res) => {


    /**
     * * GETTING ALL THE DATA FROM THE DATABSE 
     */
    Post.find( (err , data) =>{
        if( err ){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


module.exports = router;