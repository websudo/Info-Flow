
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React,{useState , useEffect} from 'react'
import convimg from '../../assets/logo/logo1.png'
import Divider from '@mui/material/Divider';
import axios from '../../api/index'
import './Conversation.css'

const useStyles = makeStyles({
    conversation:{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        cursor: 'pointer',
        marginTop: 20,

        
        '&:hover':{
            backgroundColor: '#d6d6d6'
        },

        ['@media (max-width: 720px)']:{
            marginTop: 0,
            padding: '5px',
            cursor: 'pointer',
        },
    },
 
   

    divider:{
        

        ['@media (max-width: 720px)']:{
            width: '2px',
            backgroundColor: 'rgb(180, 180, 180)',
            marginLeft: '5px',
            marginRight: '5px',
            height:'40px',
            padding: 1,
        },
        
    }

  });




export default function Conversation({ conversation , currentuser}) {
    const classes = useStyles();

    const [user , setUser ] = useState(null);

    
    useEffect(() => {
        console.log(conversation)
        const friendId = conversation.member.find( m => m !== currentuser)

        const getUser = async () => {

            try{
                const res = await axios.get('/api/user?userId=' + friendId);
                setUser(res.data)
            }

            catch(err){
                console.log(err);
            }
            
        }

        getUser();
    }, [currentuser , conversation])

    return (
        <div className={classes.conversation}>
            { user?.admin ? 
                        <div className='conv__img__admin'>
                            <span className='conv__initials'>{ (user?.name[0] !== undefined ?user?.name[0].toUpperCase():'') + (user?.name.split(" ")[1] !== undefined ?user?.name.split(" ")[1].charAt(0).toUpperCase():'') }</span>
                        </div> :
                        <div className='conv__img'>
                            <span className='conv__initials'>{(user?.name[0] !== undefined ?user?.name[0].toUpperCase():'')  + (user?.name.split(" ")[1] !== undefined ?user?.name.split(" ")[1].charAt(0).toUpperCase():'') }</span>
                        </div> 
            }
            <span className='conv__name'>{ user ? user.name : null}</span>
            <div className={classes.divider}></div>
        </div>
    )
}
