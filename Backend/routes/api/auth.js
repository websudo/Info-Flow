const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config();

// * User Model
const User = require('../../models/User');

const JWT_SECRET = process.env.TOKEN_SECRET;


// Sendgrid Configuration
/*const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)*/

//SendInBlue Configuration
var SibApiV3Sdk = require('sib-api-v3-sdk')
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_API_KEY



/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // * Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {

    // * Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    if( user.active == false){
      throw Error( "Verify email address to proceed")
    }
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        admin : user.admin,
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});



/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {

  

  const { name, email, password , password_confirmation } = req.body;

  // * Simple validation
  if (!name || !email || !password || !password_confirmation) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  if( password != password_confirmation){
      return res.status(400).json( { msg : 'Password mismatch'})
  }

  try {
    const user = await User.findOne({ email , name });
    if (user) throw Error('User already exists');


    /**
     * * Generating the Salt in this Step.
     * * a Salt is random data that is used as an additional input to a one-way function that password
     */
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');



    /**
     * * Now here we are passing the passord and salt to create a hash 
     */
    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');


    /**
     * * This hash is stored in the db as password 
     */
    const newUser = new User({
      name,
      email,
      password: hash,
      temporarytoken: jwt.sign({name : name,email: email},JWT_SECRET,{ expiresIn: 12000})
    });


    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');
    if(savedUser){
      
      // const msg = {
      //   to: savedUser.email, // Change to your recipient
      //   from: 'realinfoflow@gmail.com', // Change to your verified sender
      //   subject: 'Email Verification',
      //   text: `Click this link to verify your account https://infoflow.herokuapp.com/auth/verify/${savedUser.temporarytoken}`,
      //   html: `<strong>Click this link to verify your account</strong>
      //   <a href="https://infoflow.herokuapp.com/api/auth/verify/${savedUser.temporarytoken}">Click Here</a>`,
      // }
      // sgMail
      // .send(msg)
      // .then(() => {
      //   console.log('Email sent')
      // })
      // .catch((error) => {
      //   console.error(error)
      // })

      /*let apiInstance = new SibApiV3Sdk.ContactsApi();
      let createContact = new SibApiV3Sdk.CreateContact();
      createContact.email = 'ritiknair19@gmail.com';
      createContact.listIds = [2];

      apiInstance.createContact(createContact)
      .then(data => {
        console.log(JSON.stringify(data))
        new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
          {
            'subject' : "Email Verification",
            'sender' : { 'email': 'realinfoflow@gmail.com', 'name':'Info-Flow'},
            'replyTo' : { 'email': 'realinfoflow@gmail.com', 'name':'Info-Flow'},
            'to' : [{'email':'ritiknair19@gmail.com'}],
            'htmlContent' : `<strong>Click this link to verify your account</strong>
            <a href="https://infoflow.herokuapp.com/api/auth/verify/${savedUser.temporarytoken}">Click Here</a>`,
            'params' : {'bodyMessage': 'Email Verification'}
          }
        )
        .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch(err => console.log(err))*/

      
      new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
          'subject' : "Email Verification",
          'sender' : { 'email': 'realinfoflow@gmail.com', 'name':'Info-Flow'},
          'replyTo' : { 'email': 'realinfoflow@gmail.com', 'name':'Info-Flow'},
          'to' : [{'email':savedUser.email}],
          'htmlContent' : `<strong>Click this link to verify your account</strong>
          <a href="https://infoflow.herokuapp.com/api/auth/verify/${savedUser.temporarytoken}">Click Here</a>`,
          'params' : {'bodyMessage': 'Email Verification'}
        }
      )
      .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
    }
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


/**
 * @route   PUT api/auth/user
 * @desc    Update user data after email verification
 * @access  Public
 */

router.get('/verify/:token', async (req, res) => {
  console.log( "in verification code")
  try{
    User.findOne( { temporarytoken : req.params.token}, (err, user) => {
      if( err) console.log(err);

      const token = req.params.token;
      console.log( `the token is ${token}`);
      if( !user){
        res.json({
          success : false,
          message: "Token is invalid!"
        });
      }

      if(user){
      jwt.verify( token , JWT_SECRET, (err , decoded) => {
        if( err ){
          res.json({
            success : false,
            message: "Activation link has expired"
          });
        }
        
        else{
          user.temporarytoken = false;
          user.active = true;

          user.save( err => {
            if(err){
              console.log(err);
            }
            else{
              // const emailActivate = {
              //   from: "infoflow@gmail.com",
              //   to: user.email,
              //   subject: "Account Activated Successfully",
              //   text: `Hello ${user.name}, your account has been successfully activated!`,
              //   html: `Hello <strong> ${user.name}</strong>,<br><br> Your account has been successfully activated!`
              // }

              // sgMail.send(emailActivate, (err,info) => {
              //   if( err) console.log( err);
              //   else{
              //     console.log( "Activation message confiramtion" + info.response);
              //   }
              // });

              new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
                {
                  'subject' : "Account Activated Successfully",
                  'sender' : { 'email': 'realinfoflow@gmail.com', 'name':'Info-Flow'},
                  'replyTo' : { 'email': 'realinfoflow@gmail.com', 'name':'Info-Flow'},
                  'to' : [{'email':user.email}],
                  'htmlContent' : `Hello <strong> ${user.name}</strong>,<br><br> Your account has been successfully activated!`,
                  'params' : {'bodyMessage': 'Email Verification'}
                }
              )
              .then(() => {
                  console.log('Successfull Activation Email sent')
                })
                .catch((error) => {
                  console.error(error)
                })
              res.send(`<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link rel="apple-touch-icon" href="https://res.cloudinary.com/dguetook9/image/upload/v1638962159/Logo/logo1_outyop.png" />
                  <link rel="icon" href="https://res.cloudinary.com/dguetook9/image/upload/v1638962159/Logo/logo1_outyop.png" />
                  <title>Info-Flow</title><link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500&display=swap" rel="stylesheet"> 
                  <style>
                      body{
                          background-color:rgb(225, 225, 225) ;
                          background-size: cover;
                      }
                     .root{
                          text-align: center;
                          margin-top: 20vh;
                          margin-left: 10px;
                          margin-right: 10px;
                      }
              
                      .main-div{
                          max-width: 600px;
                          background-color: rgb(246, 246, 246);
                          color: rgb(0, 0, 0);
                          padding: 40px 20px;
                          border-radius: 10px;
                          margin-left: auto;
                          margin-right: auto;
                          text-align: center;
                          margin-top: 20px;
                          box-shadow: 0px 0px 10px rgb(185, 185, 185);
                      }
              
                      .heading{
                          font-family: 'Fira Sans', sans-serif;
                          font-weight: 500;
                      }
              
                      .sub-heading{
                          font-family: 'Fira Sans', sans-serif;
                          font-weight: 300;
                      }
              
                      .link{
                          text-decoration: none;
                          color: black;
                          font-family: 'Fira Sans', sans-serif;
                          font-weight: 400;
                      }
              
                      
              
                      .company-details{
                          font-family: 'Fira Sans', sans-serif;
                          font-weight: 400;
                          margin-top: 20px;
                      }
                      
                      .logo{
                          width: 120px;
                      }
                  </style>
              </head>
              <body>
                  <div class="root">
                  <img class="logo" src='https://res.cloudinary.com/dguetook9/image/upload/v1638962159/Logo/logo1_outyop.png'>
                  <div class="main-div">
                      <h1 class="heading">Account Activated Successfully!</h1>
                      <p class="sub-heading">Hello ${user.name} your account has been successfully activated.</p><br>
                      <a class="link" href="https://infoflow.netlify.app/auth">Click here to log in to your account.</a>
                  </div>
                  <p class="company-details">Info-Flow</p>
              
                  </div>
              </body>
              </html>`)
            }
          })
        }
      })
      }
    })
  }
  catch(e){
    console.log(e)
  }
})

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports =  router;