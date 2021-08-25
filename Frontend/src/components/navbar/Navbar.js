import React , { useEffect , useState , useContext } from 'react'
import { useLocation } from 'react-router';
import "./Navbar.css";
import { Link } from 'react-router-dom'




const Navbar = () => {

    const location = useLocation();
    
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
        localStorage.clear()
        setIsLoggedIn({ ...isLoggedIn , 
            loggedin : false,
            name : ''    
        } , () => {
            localStorage.clear();
        })
    }



	return (
        <div>
        
            <nav class="navbar">
                <Link to = '/'>
                    <a href="#" class="brand-title" >Info-Flow</a>
                </Link>
                <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                </a>
                
                {
                    !isLoggedIn.loggedin &&
                <div class="navbar-links">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <Link to = '/auth'>
                        <li><a href="#">Login</a></li>
                    </Link>
                </ul>
                </div>

                }

                {
                    isLoggedIn.loggedin &&
                    <div class="navbar-links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">{isLoggedIn.name}</a></li>
                        <Link to = '/auth' onClick={ handleLogout }>
                            <li><a href="#">Logout</a></li>
                        </Link>
                    </ul>
                    </div>
                }

             
            </nav>
        </div>
	);
};
export default Navbar;
