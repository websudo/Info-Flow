import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Post from '../../components/post/Post_Card'

export default function Home() {
    return (
        <div className="home">
			{/* header */}
			<div className="home__header">
				<Navbar />
			</div>
			{/* main */}
			<div className="home__main">
				<Post />
            </div>
        </div>
    )
}
