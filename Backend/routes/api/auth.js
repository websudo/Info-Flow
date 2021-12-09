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

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



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

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
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
    const user = await User.findOne({ email });
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
      
      const msg = {
        to: savedUser.email, // Change to your recipient
        from: 'realinfoflow@gmail.com', // Change to your verified sender
        subject: 'Email Verification',
        text: `Click this link to verify your account https://infoflow.netlify.app/api/auth/verify/${savedUser.temporarytoken}`,
        html: `<strong>Click this link to verify your account</strong>
        <a href="https://infoflow.netlify.app/api/auth/verify/${savedUser.temporarytoken}">Click Here</a>`,
      }
      sgMail
      .send(msg)
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

      jwt.verify( token , JWT_SECRET, (err , decoded) => {
        if( err ){
          res.json({
            success : false,
            message: "Activation link has expired"
          });
        }
        else if( !user){
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
              const emailActivate = {
                from: "realinfoflow@gmail.com",
                to: user.email,
                subject: "Account Activated Successfully",
                text: `Hello ${user.name}, your account has been successfully activated!`,
                html: `Hello <strong> ${user.name}</strong>,<br><br> Your account has been successfully activated!`
              }

              sgMail.send(emailActivate, (err,info) => {
                if( err) console.log( err);
                else{
                  console.log( "Activation message confiramtion" + info.response);
                }
              });
              res.send(`<h1>Account Acctivated successfully</h1><br><a href="https://infoflow.netlify.app">Click here to sign in</a>`)
            }
          })
        }
      })
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