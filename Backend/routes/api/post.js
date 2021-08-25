const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')


/**
 * * IMPORTING THE POST MODEL FROM MODELS FOLDER
 */
const Post = require('../../models/Post')




/**
 * * POST METHOD FOR ADDING DATA TO THE DATABSE 
 * * Passing the auth middleware in it so as to check if the user is Authorized 
 */
router.post('/' , auth ,  async (req,res) =>{

    /** 
     * * GETTING THE BODY OF THE REQUEST RECIEVED 
     */
    const post = req.body;
    console.log( post )

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




/**
 * * Delete method for deleting the post
 * * on the basis of id 
 */
router.delete('/' , auth , async (req,res) => {


    const id = req.body.id

    /**
     * * Passing the particular id of the post to delete
     */
    Post.deleteOne( { _id : id  } , (err , data) =>{
        if( err ){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


module.exports = router;