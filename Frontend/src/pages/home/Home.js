import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Post from '../../components/post/Post_Card'
import SwitchBar from '../../components/switch/SwitchBar'

export default function Home() {

	const [ isLoggedIn , setIsLoggedIn ] = useState(false);

	useEffect(() => {
		if(localStorage.getItem("profile")){
			setIsLoggedIn(true)
		}
	})

    return (
        <div className="home">
			{/* header */}
			<div className="home__header">
				<Navbar />
			</div>
			{/* switch bar */}
			{isLoggedIn && 
				<div className="home__switch__bar">
					<SwitchBar />
				</div>
			}
			
			{/* main */}
			<div className="home__main">
				<Post />
            </div>
        </div>
    )
}
