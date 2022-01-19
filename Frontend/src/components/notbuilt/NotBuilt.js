import React from 'react'
import "./NotBuilt.css"
import Navbar from '../navbar/Navbar'
import SwitchBar from '../switch/SwitchBar'

export default function NotBuilt() {
    return (
        <div>
            <Navbar/>
            <SwitchBar/>
                  <div className="root">
                  
                  <div className="main-div">
                    <img className="logo" src='https://res.cloudinary.com/dguetook9/image/upload/v1642594690/Logo/crane_logo_new_mvlpsx.png'/>
                    {/* <img className="logo" src='https://res.cloudinary.com/dguetook9/image/upload/v1642569312/Logo/crane_logo_kycmya.png'/> */}
                    {/* <img className="logo" src='https://res.cloudinary.com/dguetook9/image/upload/v1642569307/Logo/cogwheel_logo_sdw5yh.png'/> */}
                    <h1 className="heading">Coming Soon!</h1>
                    <p className="sub-heading">This page is under construction</p>
                    <p className="sub-sub-heading">We're working on it!</p>
                  </div>
                  <p className="company-details">Info-Flow</p>
              
                  </div>
              
        </div>
    )
}
