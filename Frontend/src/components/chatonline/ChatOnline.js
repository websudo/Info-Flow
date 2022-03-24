
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState, useRef } from 'react'
import onlineimg from '../../assets/logo/logo1.png'
import axios from '../../api/index';
import Divider from '@mui/material/Divider';
import {io, Socket} from 'socket.io-client'
import './ChatOnline.css'

const useStyles = makeStyles({
    chatonline:{
        height:'inherit',

        ['@media (max-width: 720px)']:{
            display: 'flex',
        },
    },

    chatonline__friend:{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        cursor: 'pointer',
        marginTop: 10,

        ['@media (max-width: 720px)']:{
            
            marginRight: '5px',
            marginLeft: '5px',
        },
    },

    chatonlineimg: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid white',
    },

    chatonlineimg__div:{
        position: 'relative',
        marginRight: 10,
    },

    chatonline__badge:{
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '50%',
        top: 2,
        right: 2,
        backgroundColor: 'rgba(0, 128, 0)',
    },

    chatoffline__badge:{
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '50%',
        top: 2,
        right: 2,
        backgroundColor: 'rgba(161, 161, 161)',
    },

    chatonline__name:{

        ['@media (max-width: 720px)']:{
            
            marginRight: '10px',
        },
    },

    divider:{
        
        width: '2px',
        backgroundColor: 'rgb(100, 100, 100)',
        marginLeft: '5px',
        marginRight: '5px',
    
    }
  });




export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const classes = useStyles();
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const onlineUser = useRef();
    const socket = useRef();

    useEffect(() =>{
        socket.current = io('https://infofloww.herokuapp.com/');
        socket.current.on("getUsers", (users) =>{
            console.log(users);
            let onlinef = [];
            users.forEach( e => {
                if( e.userId !== currentId){
                    onlinef.push(e.userId);
                }
            })
            setOnlineFriends(onlinef);
            onlineUser.current = onlinef;
        })
    },[])

    useEffect(() =>{
        const getFriends = async () =>{
            const res = await axios.get("/api/users");
            console.log( res.data);
            setFriends(res.data.filter( f => f._id !== currentId));
        }

        getFriends();
    },[currentId]);

    useEffect(() =>{
        setOnlineFriends(friends.filter( f => onlineUsers.includes(f._id)));
    },[friends, onlineUsers])


    const handleClick = async  (user) =>{
        console.log( user);
        try{
            const res = await axios.get(`/api/conversation/find/${currentId}/${user._id}`);
            if( res.data){
                setCurrentChat(res.data);
            }
            else{
                
                axios.post('/api/conversation', {
                    senderId: currentId,
                    receiverId: user._id,
                    newMessageCounter: 0,
                })
                .then( res => {
                    console.log( res)
                    setCurrentChat(res.data)
                    socket.current.emit("refresh_conversation");
                })
                .catch(err => console.log( err));
            }
            
        }
        catch(err){
            console.log(err);
        }
    }

    console.log(onlineFriends, onlineUser.current)
    return (
        <div className={classes.chatonline}>
            {friends.map( o => (
            <div className={classes.chatonline__friend} onClick={() => handleClick(o)}>
                <div className={classes.chatonlineimg__div}>
                    {/* <img className={classes.chatonlineimg} src={onlineimg}></img> */}
                    { o.admin ? 
                        <div className="avatar-circle-admin">
                            <span className="initials">{o.name[0].toUpperCase() + (o.name.split(" ")[1] !== undefined ?o.name.split(" ")[1].toUpperCase():'') }</span>
                        </div> :
                        <div className="avatar-circle">
                            <span className="initials">{o.name[0].toUpperCase() + (o.name.split(" ")[1] !== undefined ?o.name.split(" ")[1].toUpperCase():'') }</span>
                        </div> 
                    }
                    { onlineUser.current && onlineUser.current.includes(o._id) && <div className={classes.chatonline__badge}></div>}
                    { onlineUser.current && !onlineUser.current.includes(o._id) && <div className={classes.chatoffline__badge}></div>}
                </div>
                <span className='chatonline__name'>{o.name}</span>
                <Divider orientation="vertical" variant="middle" />
            </div>
            ))}
            
        </div>
    )
}
