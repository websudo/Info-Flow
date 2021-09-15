import React, {useState , useEffect} from 'react'
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import logoname from '../../assets/logo/logoname3-dark.png'
import './index.css'
import Button from '@material-ui/core/Button';
import forumIcon from '../../assets/features/forum.png'
import chatIcon from '../../assets/features/chat.png'
import pollingIcon from '../../assets/features/polling.png'
import Footer from '../../components/footer/Footer';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import header from '../../assets/background/header.png'
import  decode  from 'jwt-decode';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
    
    main__page:{
        margin : 0,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
    },

    main__logo:{
        marginTop: 120,
        maxWidth: 600,
    },

    main__text:{
        fontSize: 40,
        fontWeight: 'bold'
    },

    main__div:{
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 150,
        paddingLeft: 50,
        paddingRight: 50,   
        
    },

    button:{
        marginTop:20,
        marginRight: 10,
        textTransform: 'none'
    },

    features__icon:{
        maxWidth: 150,
    },

    feature__div:{
        maxWidth: 200,
    },

    features:{
        maxWidth: 1100,
        //border: '1px solid black',
        display: 'flex',
        marginTop: 150,
        paddingLeft: 50,
        paddingRight: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-between'
    },

    header__image:{
        margin: 0,
        width: '100%',
        height: 150,
    }
  });


/**
   * * Alert Function 
   */
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  
export default function Index() {
    const classes = useStyles();

    
    
    const [ isLoggedIn , setIsLoggedIn ] = useState({
        loggedin : false,
        name : ''
    })
    const [open, setOpen] = useState(false);
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    useEffect( () => {

        /**
         * * Checking if the Token has expired or not 
         */


         const interval = setInterval(() => {
            
            if( localStorage.getItem('profile')){

                const token = JSON.parse(localStorage.getItem('profile')).data.token;
                const decodedToken = decode(token)
    
                /**
                 * * decodedToken.exp will be in ms so multiplying it by 1000
                 */
                if( decodedToken.exp * 1000 < new Date().getTime()){
                    
                    setIsLoggedIn( {
                        loggedin : false,
                        name : ""
                    })
                } 
                else{
                    setIsLoggedIn( {
                        loggedin : true,
                        name : JSON.parse(localStorage.getItem('profile')).data.user.name 
                    })
                }
                
            }


          }, 1000);
          return () => clearInterval(interval);
         
    },[])


    return (
        <div className={classes.main__page}>
            <img src={header} className={classes.header__image}></img>
            <div className={classes.main__div}>
                <img className={classes.main__logo} src={logoname}></img>

                <p className='main__title'>Easy and faster transmission of information to the students.</p>
                <p className='main__desc'> <span style={{ fontWeight: '500'}}>Info-FLow</span> is the fastest and simplest way to share the most 
                important information in a managed way without any hassle on a single platform. </p>

                { !isLoggedIn.loggedin && 
                    <div>
                        <Link to='/auth'>
                            <Button variant="contained" color="primary" className={classes.button} disableElevation>
                                Sign In 
                            </Button>
                        </Link>

                        <Link to='/home'>
                            <Button variant="contained"  className={classes.button} disableElevation>
                                Continue without Signing In    
                            </Button>
                        </Link>
                    </div>
                }

                { isLoggedIn.loggedin && 
                    <div>
                        <Link to='/home'>
                            <Button variant="contained" color="primary" className={classes.button} disableElevation>
                                Continue to Homepage
                            </Button>
                        </Link>

                    </div>
                }       
                
            </div>
 
  

            <div className={classes.features}>

                <div className={classes.feature__div}>
                    <img className={classes.features__icon}  src={forumIcon}></img>
                    <p className='features__title'>Forum</p>
                    <p className='features__text'>Share important information with the related files attached to it and get feedback and queries for the same.</p>
                </div>

                <div className={classes.feature__div}>
                    <img className={classes.features__icon}  src={chatIcon}></img>
                    <p className='features__title'>Chat</p>
                    <p className='features__text'>Direct one-to-one interaction with the faculty members, and peers.</p>
                </div>

                <div className={classes.feature__div}>
                    <img className={classes.features__icon}  src={pollingIcon}></img>
                    <p className='features__title'>Polling</p>
                    <p className='features__text'>Get real-time opinions of students about a particular topic.</p>
                </div>
            </div>
            

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                        You have been Logged out. Please Login to continue!
                </Alert>
            </Snackbar>

            <Footer/>
        </div>
    )
}
