import React , { useEffect , useState , useContext } from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom'




const Navbar = () => {

    
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

    
    
    const handleLogout = () =>{
        localStorage.clear()
        setIsLoggedIn({ ...isLoggedIn , 
            loggedin : false,
            name : ''    
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
                
                <div class="navbar-links">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <Link to = '/auth'>
                        <li><a href="#">Login</a></li>
                    </Link>
                </ul>
                </div>

                {/*
                    value.loggedin &&
                    <div class="navbar-links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">{value.name}</a></li>
                        <Link to = '/auth' onClick={ handleLogout }>
                            <li><a href="#">Logout</a></li>
                        </Link>
                    </ul>
                    </div>
                */}

             
            </nav>
        </div>
	);
};
export default Navbar;
