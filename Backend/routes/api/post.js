const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const multer = require('multer')



/**
 * * IMPORTING THE POST MODEL FROM MODELS FOLDER
 */
const Post = require('../../models/Post')




const storage = multer.diskStorage({
    destination: (req , file , callback) => {
        callback( null , "../Frontend/public/uploads");
    },
    filename: ( req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage:storage});

/**
 * * POST METHOD FOR ADDING DATA TO THE DATABSE 
 * * Passing the auth middleware in it so as to check if the user is Authorized 
 */
router.post('/' , auth , upload.array("upload", 10) ,  async (req,res) =>{

    /** 
     * * GETTING THE BODY OF THE REQUEST RECIEVED 
     */
    const post = req.body;

    

    if( req.body._id ){
        Post.findByIdAndUpdate( req.body._id , post , (err , data) =>{
            if( err ){
                res.status(500).send(err);
                console.log('1')
            }
            else{
                res.status(201).send(data)
                console.log( "2")
            }
        })
    }

    else{

        console.log( " This is file name " , req.files)

        const newPost = new Post({
            creator_id : req.body.creator_id,
            createdby : req.body.createdby,
            title : req.body.title,
            description : req.body.description,
            upload : []
        })


        for( var i =0 ; i< req.files.length ; i++){
            newPost.upload.push(req.files[i].originalname)
        }


        
        /*newPost
        .save()
        .then( () => { res.status(200).send(data); console.log('3')})
        .catch( (err) => { res.status(500).send(err); console.log("4") })*/
        
        
        Post.create( newPost , (err , data) =>{
            if( err ){
                res.status(500).send(err)
            }
            else{
                res.status(200).send(data)
            }
        })
    }
    
})




/**
 * * GET METHOD FOR FETCHING THE DATA FROM THE DATABSE 
 */
router.get('/' , (req,res) => {


    /**
     * * GETTING ALL THE DATA FROM THE DATABSE 
     */
    console.log( " Get route called ")
    Post.find( (err , data) =>{
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
            console.log('7')
        }
        else{
            res.status(200).send(data)
            console.log('8')
        }
    })
})


module.exports = router;