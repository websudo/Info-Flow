const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')



/**
 * * IMPORTING THE POLL MODEL FROM MODELS FOLDER
 */
const Poll = require('../../models/Poll')


/**
 * * POST METHOD FOR ADDING DATA TO THE DATABSE 
 * * Passing the auth middleware in it so as to check if the user is Authorized 
 */
router.post('/' , auth , async (req,res) =>{

    /** 
     * * GETTING THE BODY OF THE REQUEST RECIEVED 
     */
    const poll = req.body;
    console.log("body of request",poll);

    

        const newPoll = new Poll({
            poll_title : req.body.title,
            poll_description: req.body.description,
            creator_id : req.body.creator_id,
            createdby : req.body.createdby,
            option_list : req.body.option,
            active: req.body.active,
            submitted_by: req.body.submitted_by,
        })

        //var n = req.body.upload.length;

       //for( var i =0 ; i < n ; i++){
          //  newPost.upload.push(req.body.upload[i]);
        //}


        try{
            const savedPoll = await newPoll.save();
            console.log( "saved poll", savedPoll)
            res.status(200).send(savedPoll);
        }
        catch(err){
            res.status(500).send(err);
        }
        
        
        // Post.create( req.body , (err , data) =>{
        //     if( err ){
        //         res.status(500).send(err)
        //     }
        //     else{
        //         res.status(200).send(data)
        //     }
        // })
    
    
})



router.get('/' , auth , async (req,res) =>{
    console.log( " Get route called ")
    Poll.find( (err , data) =>{
        if( err ){
            res.status(500).send(err);
            console.log('5')
        }
        else{
            res.status(200).send(data);
            console.log('6')
        }
    })
})



// UPDATING THE POLL FROM ACTIVE STATUS TO CLOSED
router.post('/closepoll' , auth , async (req,res) =>{
    
    const id = req.body.id;
    console.log("id of poll", id);

    Poll.updateOne( { "_id" : id  } , {"active": false}, (err , data) =>{
        if( err ){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


// UPDATING THE POLL ADDING THE USER ID WHO HAS SUBMITTED THE POLL
router.post('/add-user-submitted' , auth , async (req,res) =>{
    
    const id = req.body.id;
    const submittedUserArr = req.body.submitted_by;
    const optionsArr = req.body.options;
    const totalVote = req.body.total_vote;
    console.log("submitted user array of poll", submittedUserArr, optionsArr);

    Poll.updateOne( { "_id" : id  } , {"submitted_by": submittedUserArr, "option_list": optionsArr, "total_vote": totalVote }, (err , data) =>{
        if( err ){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

// UPDATING THE POLL ADDING THE USER ID WHO HAS NOT SUBMITTED THE POLL
router.post('/add-user-not-submitted' , auth , async (req,res) =>{
    
    const id = req.body.id;
    const userId = req.body.userId;
    let submittedUserArr;
    let not_submittedArr = [];
    let flag;


    Poll.findById(id, (err, data) => {
        if( err ){
            res.status(500).send(err);
        }
        else{
            console.log('data', data);
            submittedUserArr = data.submitted_by;
            console.log('aubArr', submittedUserArr);
            if( data.not_submitted.length !== 0){
                not_submittedArr = data.not_submitted;    
            }
            flag = data.submitted_by.includes(userId);
            console.log("falg", flag, not_submittedArr);
        }
    });

    if(!flag){
        not_submittedArr.push(userId)
        console.log(not_submittedArr);

        Poll.updateOne( { "_id" : id  } , {"not_submitted": not_submittedArr}, (err , data) =>{
            if( err ){
                res.status(500).send(err)
            }
            else{
                res.status(200).send(data)
            }
        })
    }
    
})

module.exports = router;