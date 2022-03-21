const express = require('express')
const router = express.Router()
const Conversation = require('../../models/Conversation')


router.post( "/" , async (req,res) =>{
    console.log(req.body)
    const newConversation = new Conversation({
        member: [req.body.senderId , req.body.receiverId],
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch(err){
        res.status(500).json(err);
    }
})


router.get( "/:userId" , async (req, res) => {
    try{

        console.log("userid", req.params.userId)
        const conversation = await Conversation.find({
            member : { $in: [req.params.userId]},
        })
        console.log( " conversation",conversation)
        res.status(200).json(conversation)
    }
    catch(err){
        res.status(500).json(err);
    }
})


//get conversation includes two user id

router.get("/find/:firstUserId/:secondUserId", async (req,res) => {
    try{

        console.log("users",req.params.firstUserId, req.params.secondUserId)
        const conversation = await Conversation.findOne({
            member : { $all: [req.params.firstUserId, req.params.secondUserId]},
        })
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
})


//update conversation

// router.update("/:conversationId/:counter", async (req,res) => {
//     try{
//         const conversation = await Conversation.updateOne(
//             { _id : req.params.conversationId},{ $set : { newMessageCounter: req.params.counter }}
//         )
//         res.status(200).json(conversation);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

module.exports = router;

