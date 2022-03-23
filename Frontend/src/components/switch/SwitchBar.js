import React,{useEffect} from 'react'
import './SwitchBar.css'
import ForumIcon from '@mui/icons-material/Forum';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

export default function SwitchBar() {

   console.log()

    useEffect(() => {
        if(window.location.href.split('/').pop() == 'home'){
            document.querySelector('.forum-icon-div').style.backgroundColor = "white";
            document.querySelector('.forum-icon-div').style.color = "black";
        }
        if(window.location.href.split('/').pop() == 'notbuilt'){
            document.querySelector('.chat-icon-div').style.backgroundColor = "white";
            document.querySelector('.chat-icon-div').style.color = "black";
        }
        if(window.location.href.split('/').pop() == 'chat'){
            document.querySelector('.chat-icon-div').style.backgroundColor = "white";
            document.querySelector('.chat-icon-div').style.color = "black";
        }
    })
    return (
        <div className="switch-bar-div">
            <Link to='/home' style={{ textDecoration: 'none', color : "black"}}>
                <div className="forum-icon-div" >
                    <ForumIcon id="forum-icon" sx={{ fontSize: 40}}/>
                    <p>Forum</p>
                </div>
            </Link>
            <div className="divider"></div>

            <Link to='/chat' style={{ textDecoration: 'none', color : "black"}}>
                <div className="chat-icon-div">
                    <ChatIcon id="chat-icon" sx={{ fontSize: 40}}/>
                    <p>Chat</p>
                </div>
            </Link>
        </div>
    )
}
