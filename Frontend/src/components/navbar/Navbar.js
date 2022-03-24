import React , { useEffect , useState , useContext, useRef } from 'react'
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import "./Navbar.css";
import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo/logoname3.png'
import {io} from 'socket.io-client'


/**
 * * To decode the token 
 */
import  decode  from 'jwt-decode';
import { useDispatch } from 'react-redux';


   /**
   * * Alert Function 
   */
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    


const Navbar = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [ isLoggedIn , setIsLoggedIn ] = useState({
        loggedin : false,
        name : ''
    })

    const [ loginexp , setLoginexp ] = useState(false)
    const [open, setOpen] = useState(false);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const socket = useRef();

    const handleClickOpenLogoutDialog = () => {
      setOpenLogoutDialog(true)
    }
  
    const handleCloseLogoutDialog = () => {
      setOpenLogoutDialog(false);
    };

    useEffect(() =>{
        socket.current = io.connect("https://infofloww.herokuapp.com/");
    },[])


    useEffect( () => {

        /**
         * * Checking if the Token has expired or not 
         */


         const interval = setInterval(() => {
            
            if( JSON.parse(localStorage.getItem('profile'))){
                const token = JSON.parse(localStorage.getItem('profile')).data.token;
                const decodedToken = decode(token)
    
                /**
                 * * decodedToken.exp will be in ms so multiplying it by 1000
                 */
                if( decodedToken.exp * 1000 < new Date().getTime()){
                    dispatch({ type : 'LOGOUT'})
                    history.push('/')
                    handleAutoLogout()
                } 
            }

          }, 1000);
          return () => clearInterval(interval);
         
    },[])

    useEffect( () => {

        if( localStorage.getItem('profile')){
            setIsLoggedIn( {
                loggedin : true,
                name : JSON.parse(localStorage.getItem('profile')).data.user.name 
            })

            setOpen(false)
        }
    }, [location]);

    
    const handleHamburgerClick = () => {
        const navbarLinks = document.getElementsByClassName('navbar-links')[0];
        console.log( "hey there", navbarLinks.classList)

        navbarLinks.classList.toggle('active')
    }

    
    const handleLogout = () =>{
        
        console.log("Logged out ");

        localStorage.clear();
        setIsLoggedIn({ ...isLoggedIn , 
            loggedin : false,
            name : ''    
        })
        setOpen(true)
        

        /**
         * * We can also use useHistory hook 
         * * instead of using Link when needed
         */
        history.push('/auth')
    }


    const handleAutoLogout = () => {
        setOpen(true)
        localStorage.clear();
        setIsLoggedIn({ ...isLoggedIn , 
            loggedin : false,
            name : ''    
        })
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };



	return (
        <div>
        
            <nav className="navbar">
                <Link to = '/home' className="brand-title">
                    <img src={logo}></img>
                </Link>
                <a href="#" className="toggle-button" onClick={handleHamburgerClick}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                </a>
                
                {
                    !isLoggedIn.loggedin &&
                <div className="navbar-links">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">About</a></li>
                    <Link to = '/auth' style={{ textDecoration : 'none'}}>
                        <li  style={{ cursor : 'pointer' }}>Login</li>
                    </Link>
                </ul>
                </div>

                }

                {
                    isLoggedIn.loggedin &&
                    <div className="navbar-links">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#">{isLoggedIn.name}</a></li>
                        {/*<Link to = '/auth' onClick={ handleClickOpenLogoutDialog } style={{ textDecoration : 'none'}}>*/}
                        <li  onClick={ handleClickOpenLogoutDialog } style={{ cursor : 'pointer' }} >Logout</li>
                        {/*</Link>*/}
                    </ul>
                    </div>
                }

                {   loginexp &&
                    <Alert severity="warning">You have been Logged out. Please Login to continue!</Alert>
                }


                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="warning">
                            You have been Logged out. Please Login to continue!
                            </Alert>
                    </Snackbar>
                

                    <Dialog
                        open={openLogoutDialog}
                        onClose={handleCloseLogoutDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will be Logged out from this account!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseLogoutDialog } color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} color="primary" autoFocus>
                            Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>

            </nav>
        </div>
	);
};
export default Navbar;
