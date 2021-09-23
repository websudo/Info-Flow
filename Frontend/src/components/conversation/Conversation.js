
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React,{useState , useEffect} from 'react'
import convimg from '../../assets/logo/logo1.png'
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
        }
    },
 
    conv__img:{
        width: 50,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 20,
    },

    conv__name:{
        fontWeight: 500,
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
        </div>
    )
}
