import React, {useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Signin from '../../components/signin/Signin'
import Signup from '../../components/signup/SignUp'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import background from '../../assets/background/auth-background.jpg'
import { height } from '@material-ui/system';
import './Auth.css'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 50,
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
        textAlign: 'center',
        
    },

    auth__logo: {
        marginTop: 150,
    }
  }));



export default function Auth() {

    const classes = useStyles();

    const [isSignIn , setIsSignIn] = useState(true)
    const [isSignUp , setIsSignUp] = useState(false)

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

    return (
        <div className={classes.auth__main}>

            <Link to='/'>
                <Typography variant="h1" component="h2" gutterBottom className={classes.auth__logo}>
                    Info-Flow
                </Typography>
            </Link>
            

            <Card className={classes.root}>
                <CardActions className={classes.auth__card__header}>
                    <Button size="large" onClick={() => handleClick('signin')}>
                        SignIn
                    </Button>
                    <Button size="large" onClick={() => handleClick('signup')} >
                        SignUp
                    </Button>
                </CardActions>
                <Divider className={classes.divider}></Divider>

                { isSignIn && <Signin />}
                { isSignUp && <Signup />}
            </Card>
        </div>
    )
}
