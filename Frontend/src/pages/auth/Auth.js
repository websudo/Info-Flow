import React, {useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Signin from '../../components/signin/Signin'
import Signup from '../../components/signup/SignUp'
import {Link} from 'react-router-dom'
import './Auth.css'
import logoname from '../../assets/logo/logoname2.png'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



 /**
   * * Alert Function 
   */
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles((theme) => ({
    body:{
       
    },

    root: {
        
        marginTop: 50,          
        maxWidth: 450,
        marginLeft: 'auto',
        marginRight: 'auto',
        ['@media (max-width: 420px)']:{
            marginTop: 10,
            maxHeight: 450,
            maxWidth: 300,
        },
        
    },

    auth__card__header:{
        display : 'flex',
        justifyContent: 'space-evenly'
    },

    divider: {
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
    },

    auth__main:{
        
        minHeight: 'calc(100vh - 50px)',
        // textAlign: 'center',
        // backgroundImage: 'url("https://images.unsplash.com/photo-1596638787647-904d822d751e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1462&q=80")',
        // paddingTop: 70,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        //backgroundColor: 'rgba(71, 78, 79)',
        backgroundColor: 'rgba(51,51,51)',
        //paddingBottom: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    auth__body:{
        marginTop: 50,
        textAlign: 'center'
    },

    auth__footer:{
        position: 'relative',
        left: 0,
        bottom: 0,
        //backgroundColor: 'rgba(71, 78, 79)',
        backgroundColor: 'rgba(51,51,51)',
        height: 50,
    },

    auth__logo: { 
        maxWidth: 600,
        ['@media (max-width : 420px)'] :{
            maxWidth: 250,
        },
    },


  }));



export default function Auth() {

    const classes = useStyles();

    const [isSignIn , setIsSignIn] = useState(true)
    const [isSignUp , setIsSignUp] = useState(false)
    const [ status , setStatus ] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    const handleClick = (props) => {
        if( props == 'signin'){
            if( !isSignIn){
                setIsSignIn(true)
                setIsSignUp(false)
            }
        }
        else{
            if( !isSignUp){
                setIsSignUp(true)
                setIsSignIn(false)
            }
        }
    }


    const handleSignUpAlert = (status) => {
        console.log(status);
        setStatus(true);
    }

    useEffect( () => {
        setOpen(status)
        console.log( status)
    })

    return (
        <div>
        <div className={classes.auth__main}>

            <div className={classes.auth__body}>
            <Link to='/' style={{ textDecoration : 'none'}}>
                {/*<Typography variant="h1" component="h2" gutterBottom className={classes.auth__logo}>
                    Info-Flow
                </Typography>*/}
                <img className={classes.auth__logo} src={logoname}></img>
            </Link>
            

            <Card className={classes.root}>
                <CardActions className={classes.auth__card__header}>
                    <Button size="large"  onClick={() => handleClick('signin')}>
                        SignIn
                    </Button>
                    <Button size="large" onClick={() => handleClick('signup')} >
                        SignUp
                    </Button>
                </CardActions>
                <Divider className={classes.divider}></Divider>

                { isSignIn && <Signin />}
                { isSignUp && <Signup  signupStatus={handleSignUpAlert}/>}
            </Card>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            Account created! Verify email address to continue.
                            </Alert>
                </Snackbar>

            </div>
            
        </div>
        <footer className={classes.auth__footer}>
        
        </footer>
        </div>
    )
}
