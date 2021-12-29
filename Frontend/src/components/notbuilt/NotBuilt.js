import React from 'react'
import "./NotBuilt.css"
import Navbar from '../navbar/Navbar'

export default function NotBuilt() {
    return (
        <div>
            <Navbar/>
                  <div className="root">
                  <img className="logo" src='https://res.cloudinary.com/dguetook9/image/upload/v1640782282/Logo/Notbuilt_negg9p.png'/>
                  <div className="main-div">
                      <h1 className="heading">Coming Soon!</h1>
                      <p className="sub-heading">This page is under construction</p>
                      <p className="sub-sub-heading">We're working on it!</p>
                  </div>
                  <p className="company-details">Info-Flow</p>
              
                  </div>
              
        </div>
    )
}
