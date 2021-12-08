
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React,{ useEffect , useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatonline/ChatOnline';
import axios from '../../api/index';
import SwitchBar from '../../components/switch/SwitchBar';

const useStyles = makeStyles({
    
    chat__div:{

        // Remeber to add spaces between the operands and operator
        height: 'calc( 100vh - 70px )',
        display: 'flex',
    },

    start__box:{
        flex: '3.5',
    },

    middle__box:{
        flex: '5.5',
    },

    end__box:{
        flex: '3',
    },

    chatmenu:{
        padding: 10,
        height: '100%',
  
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
        height: '100%',
    },

    chat__input:{
        width: '90%',
        padding: '10px 0',
        border: 'none',
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
        
    },
    
    noconversation:{
        position: 'absolute',
        top: '100',
        fontSize: 30,
        color: 'gray',
        cursor: 'default'
    }
  });




export default function Chat() {
    const classes = useStyles();

    const [ conversation , setConversation ] = useState([]);
    const [ currentchat , setCurrentChat ] = useState(null)
    const [ messages , setMessages ] = useState(null)
    const [ newmessage , setNewMessage ] = useState("")

    const userId = JSON.parse(localStorage.getItem("profile")).data.user.id;


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
    }, [userId]);

 
    let conversation_list = conversation.map( c => {
        
        return(
        <div onClick={() => setCurrentChat(c)}>
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

        try{
            const res= await axios.post('/api/messages' , message);
            setMessages([ ...messages , res.data]);
        }
        catch(err){
            console.log(err)
        }

    }


    console.log( messages)
    return (
        <div>
            <Navbar/>
            <SwitchBar/>
            <div className={classes.chat__div}>
                <div className={classes.start__box }>
                    <div className={classes.chatmenu}>
                        <input placeholder='Search for friends' className={ classes.chat__input}/>
                        { conversation_list}
                    </div>
                </div>
                <div className={classes.middle__box }>
                    <div className={classes.chatbox}> 

                    { currentchat ? 
                    <>
                        <div className={classes.chatbox__top}>
                            
                            { messages.map( m => {
                                console.log(m.sender, userId);
                                return(
                                    
                                    <Message message={m} own={ m.sender === userId }/>
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

                            <button 
                                onClick={handleSubmit}
                                className={classes.chat__submit}>Send</button>
                        </div>
                    </> : 
                        <span className={classes.noconversation}>Open a Conversation to start a chat.</span> 
                    }                   
                    </div>
                </div>
                <div className={classes.end__box }>
                    <div className={classes.chatonline}>
                        <ChatOnline/>

                    </div>
                </div>

            </div>
        </div>
    )
}
