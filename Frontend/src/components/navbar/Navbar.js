import React , { useEffect } from 'react'
import "./Navbar.css";



const Navbar = () => {


    useEffect( () => {
        const toggleButton = document.getElementsByClassName('toggle-button')[0]
        const navbarLinks = document.getElementsByClassName('navbar-links')[0]

        toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active')
        })

    })
    


	return (
        <div>
        
            <nav class="navbar">
                <a href="#" class="brand-title" >Info-Flow</a>
                <a href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                </a>
                <div class="navbar-links">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                </div>
            </nav>
        </div>
	);
};
export default Navbar;
