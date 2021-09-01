import React , { useEffect , useState , useContext } from 'react'
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import "./Navbar.css";
import { Link } from 'react-router-dom'

/**
 * * To decode the token 
 */
import  decode  from 'jwt-decode';
import { useDispatch } from 'react-redux';



const Navbar = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [ isLoggedIn , setIsLoggedIn ] = useState({
        loggedin : false,
        name : ''
    })

    useEffect( () => {
        const toggleButton = document.getElementsByClassName('toggle-button')[0]
        const navbarLinks = document.getElementsByClassName('navbar-links')[0]

        toggleButton.addEventListener('click', () => {
            navbarLinks.classList.toggle('active')
        })


        /**
         * * Checking if the Token has expired or not 
         */
        if( JSON.parse(localStorage.getItem('profile'))){
            const token = JSON.parse(localStorage.getItem('profile')).data.token;
            const decodedToken = decode(token)

            /**
             * * decodedToken.exp will be in ms so multiplying it by 1000
             */
            if( decodedToken.exp * 1000 < new Date().getTime()){
                dispatch({ type : 'LOGOUT'})
                handleLogout()
                history.push('/')
            } 
        }

    })



    useEffect( () => {

        if( localStorage.getItem('profile')){
            setIsLoggedIn( {
                loggedin : true,
                name : JSON.parse(localStorage.getItem('profile')).data.user.name 
            })
        }
    }, [location]);

    
    
    const handleLogout = () =>{
        
        setIsLoggedIn({ ...isLoggedIn , 
            loggedin : false,
            name : ''    
        })
    }



	return (
        <div>
        
            <nav className="navbar">
                <Link to = '/' className="brand-title">
                    Info-Flow
                </Link>
                <a href="#" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                </a>
                
                {
                    !isLoggedIn.loggedin &&
                <div className="navbar-links">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <Link to = '/auth' style={{ textDecoration : 'none'}}>
                        <li>Login</li>
                    </Link>
                </ul>
                </div>

                }

                {
                    isLoggedIn.loggedin &&
                    <div className="navbar-links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">{isLoggedIn.name}</a></li>
                        <Link to = '/auth' onClick={ handleLogout } style={{ textDecoration : 'none'}}>
                            <li>Logout</li>
                        </Link>
                    </ul>
                    </div>
                }

             
            </nav>
        </div>
	);
};
export default Navbar;
