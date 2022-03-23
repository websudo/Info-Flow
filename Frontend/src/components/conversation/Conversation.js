
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React,{useState , useEffect} from 'react'
import convimg from '../../assets/logo/logo1.png'
import Divider from '@mui/material/Divider';
import axios from '../../api/index'


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
 
    conv__img:{
        width: 50,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 20,

        ['@media (max-width: 720px)']:{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid white',
        },
    },

    conv__name:{
        fontWeight: 500,

        ['@media (max-width: 720px)']:{
            marginRight: 0,
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
            <img  src={convimg} className={ classes.conv__img}></img>
            <span className={ classes.conv__name}>{ user ? user.name : null}</span>
            <div className={classes.divider}></div>
        </div>
    )
}
