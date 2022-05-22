
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React,{ useEffect , useRef, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatonline/ChatOnline';
import axios from '../../api/index';
import SwitchBar from '../../components/switch/SwitchBar';
import {io} from 'socket.io-client'; 
import Button from '@material-ui/core/Button';
import Divider from '@mui/material/Divider';
import SearchBar from 'material-ui-search-bar';
import { Redirect } from 'react-router-dom';
import "./Chat.css"

const useStyles = makeStyles({
    
    chat__div:{

        // Remeber to add spaces between the operands and operator
        height: 'calc( 100vh - 200px)',
        display: 'flex',
        //borderTop: '3px solid rgba(124, 124, 124, 0.8)',
        //borderBottom: '3px solid rgba(124, 124, 124, 0.8)',
        ['@media (max-width: 720px)']:{
            display: 'block',
            borderBottom: 0 ,
        },
    },

    start__box:{
        flex: '3.5',
        //borderRight: '3px solid rgba(124, 124, 124, 0.8)',
        padding: '10px',
        textAlign: 'center',
        overflow: 'auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        marginLeft: 10,
        marginRight: 5,
        ['@media (max-width: 720px)']:{
            //border: '2px solid rgba(150,150,150)',
            margin: '10px',
            padding: 0,
        },
    },

    middle__box:{
        flex: '5.5',
        //borderRight: '3px solid rgba(124, 124, 124, 0.8)',
        backgroundColor: 'white',
        borderRadius: '10px',
        marginLeft: 5,
        marginRight: 5,
        ['@media (max-width: 720px)']:{
            //border: '2px solid rgba(150,150,150)',
            minHeight: '200px',
            maxHeight: '300px',
            margin: '10px'
        },
    },

    end__box:{
        flex: '3',
        textAlign: 'center',
        overflow: 'auto',
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 10,
        borderRadius: '10px',
        ['@media (max-width: 720px)']:{
            overflowX: 'scroll',
            //border: '2px solid rgba(150,150,150)',
            margin: '10px',
        },
    },

    chatmenu:{
        padding: 10,
        backgroundColor: '#F5F5F5',
        padding: 5,
        borderRadius: '10px',
        marginTop: '10px',
        ['@media (max-width: 720px)']:{
            //border: '1px solid rgba(150,150,150)',
            display: 'flex',
            overflowX: 'scroll',    
        },

    },

    chatbox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: 10,
        height: '100%',

        
    },

    chatonline:{
        padding: 10,
        // ['@media (max-width: 720px)']:{
        //     overflowX: 'scroll',
        // },
    },

    chat__online__div:{
        height: '100%',
        backgroundColor: '#F5F5F5',
        padding: 5,
        borderRadius: '10px',
        marginTop: '10px',
        ['@media (max-width: 720px)']:{
            //border: '1px solid rgba(150,150,150)',
            display: 'flex',
            overflowX: 'scroll',    
        },
    },

    chat__online__title:{
        padding: 10,
        borderRadius: '10px',
        backgroundColor:'rgba(63,81,181)',
    },

    conversation__title:{
        padding: 10,
        borderRadius: '10px',
        backgroundColor:'rgba(63,81,181)',
    },

    chat__input:{
        width: '100%',
        padding: '10px 10px',
        border: 'none',
        // marginLeft: '10px',
        // marginRight: '10px',
    },

    chatbox__bottom:{
        marginTop:5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'sapce-between',

    },

    chatmsg__input:{
        width: '80%',
        height: '90%',
        padding: 10,
    },
   
    chat__submit:{
        width: 70,
        height: 40,
        border: 'none',
        borderRadius: 5,
        backgroundColor: 'teal',
        cursor: 'pointer',
        color: 'white',
    },

    
    

    chatbox__top:{
        height: '100%',
        overflowY: 'scroll',
        paddingRight: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: '10px',
        ['@media (max-width: 720px)']:{
            border: '1px solid rgba(200,200,200)',
            overflowY: 'scroll',
            minHeight: '200px',
            maxHeight: '200px',
        },
    },
    
    noconversation:{
        position: 'absolute',
        top: '100',
        fontSize: 30,
        color: 'gray',
        cursor: 'default',

        ['@media (max-width: 720px)']:{
            fontSize: 20,
        },
    },
     
    post__button:{
        marginLeft: 10,
    }
  });




export default function Chat() {
    const classes = useStyles();

    const [ conversation , setConversation ] = useState([]);
    const [ currentchat , setCurrentChat ] = useState(null)
    const [ messages , setMessages ] = useState(null)
    const [ newmessage , setNewMessage ] = useState("")
    const [ arrivalMessage , setArrivalMessage ] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [convUser, setConvUser] = useState(false);
    const newMessageCounter = useRef(0);
    const socket = useRef();
    const scrollRef = useRef();

    const userId = JSON.parse(localStorage.getItem("profile"))?.data.user.id;

    useEffect( () =>{
        socket.current = io("https://infofloww.herokuapp.com/");
        socket.current.on("getMessage", data =>{
            console.log(data);
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
    },[])

        socket.current.on("refresh_conv", () =>{
            const getConversation = async () => {
                try{
                    const res = await axios.get("/api/conversation/" + userId);
                  
                    setConversation(res.data);
                }
                catch(err){
                    console.log(err);
                }
            }
            getConversation();
        })

        socket.current.emit( "reloaded-getUsers");
    },[])


    useEffect(() =>{
        arrivalMessage && currentchat?.member.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    },[arrivalMessage, currentchat]);

    useEffect(()=>{
        socket.current.emit("addUser", userId);
        socket.current.on("getUsers", users =>{
            console.log( users);
            setOnlineUsers(users);
        })
    },[userId])
  


    useEffect(() => {
        const getConversation = async () => {
            try{
                const res = await axios.get("/api/conversation/" + userId);
              
                setConversation(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getConversation();
    },[userId, currentchat]);


    


    useEffect( () => {
        const getConversation = async () => {
            try{
                const res = await axios.get("/api/conversation/" + userId);
                console.log("i am here", res.data)
                setConversation(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getConversation();
    },[])

    
    const setCurrentChatFunc = (c) =>{
        console.log(c.member, c.member.indexOf(userId))
        setCurrentChat(c);
        c.member.splice(c.member.indexOf(userId),1)
        console.log(c.member)
        setConvUser(c.member[0]);
       
    }

    let conversation_list = conversation.map( c => {
        console.log(c);
        return(
        <div onClick={() => setCurrentChatFunc(c)} style={{ background: c.member.includes(convUser) ?'rgba(63,81,181,0.4)': 'none', borderRadius: '10px'}}>
            <Conversation conversation={c} currentuser={userId}/>
        </div>
        )
    })


    console.log(currentchat)
    useEffect(() => {
        const getMessages = async () => {

            try{
                const res = await axios.get('/api/messages/' + currentchat?._id)
                setMessages(res.data)
            }
            catch(err){
                console.log(err);
            }
            
        }

        getMessages();
    }, [currentchat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const message = {
            sender : userId,
            text : newmessage,
            conversationId : currentchat._id,
        }

        const receiverId = currentchat.member.find( member => member !== userId);

        socket.current.emit("sendMessage" , {
            senderId : userId,
            receiverId,
            text: newmessage,
            
        })


        try{
            const res= await axios.post('/api/messages' , message);
            setMessages([ ...messages , res.data]);
            setNewMessage("");

            try{
                newMessageCounter.current = newMessageCounter.current + 1;
                console.log(`/api/conversation/${currentchat._id}/${newMessageCounter.current}`);
                const res = await axios.update(`/api/conversation/${currentchat._id}/${newMessageCounter.current}`);
                console.log( res ); 
            }
            catch(err){
                console.log(err);
            }
        }
        catch(err){
            console.log(err)
        }

    }

    const doSomethingWith = () =>{

    }

    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior : 'smooth'})
    },[messages])

    console.log( messages)

    if( userId === undefined){
        return (
            <Redirect to='/auth'/>
        )
    }
    return (
        <div>
            <Navbar/>
            <SwitchBar/>
            <div className={classes.chat__div}>
                
                <div className={classes.start__box }>
                    <div className={classes.conversation__title}>
                        <p className='conversation__title'>Conversations</p>     
                    </div>
  
                    {/* <input placeholder='Search for friends' className={ classes.chat__input}/> */}
                    {/* <SearchBar
                        value={searchValue}
                        onChange={(newValue) => setSearchValue(newValue)}
                        onRequestSearch={() => doSomethingWith(searchValue)}
                        onCancelSearch ={  
                        () => setSearchValue("")
                        }
                        className={classes.searchbar}
                    /> */}
                    <div className={classes.chatmenu}>
                        
                        { conversation_list}
                    </div>
                </div>
                <div className={classes.middle__box }>
                    <div className={classes.chatbox}> 

                    { currentchat ? 
                    <>
                        <div className={classes.chatbox__top}>
                            
                            { messages.map( m => {
                                console.log(m, userId);
                                return(
                                    <div ref={scrollRef}>
                                        <Message message={m} own={ m.sender === userId }/>  
                                    </div>
                                )
                            })}
                           
                        </div>
                        <div className={classes.chatbox__bottom}>
                            <textarea 
                                onChange={ (e) => { setNewMessage(e.target.value)}}
                                value={newmessage}
                                className={ classes.chatmsg__input}  
                                placeholder="write something">
                            </textarea>

                            <Button 
                                size="small" 
                                color="primary"
                                variant="contained"
                                type="submit"
                                className={classes.post__button}
                                disableElevation
                                onClick={handleSubmit}
                                >
                                Send
                            </Button>
                        </div>
                    </> : 
                        <span className={classes.noconversation}>Open a Conversation to start a chat.</span> 
                    }                   
                    </div>
                </div>
                <div className={classes.end__box }>
                    <div className={classes.chatonline}>
                        <div className={classes.chat__online__title}>
                            <p className='chat__online__title'>Users</p>
                        </div>
                        
                        <div className={classes.chat__online__div}>
                            <ChatOnline onlineUsers={onlineUsers} currentId={userId} setCurrentChat={setCurrentChat}/>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}
