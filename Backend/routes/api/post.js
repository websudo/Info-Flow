const express = require('express')
const router = express.Router()

// Post model 
const Post = require('../../models/Post')


router.post('/' , (req,res) =>{
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

router.get('/' , (req,res) => {
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