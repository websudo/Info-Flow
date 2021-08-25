import React, { useEffect , useState , useContext} from 'react';
import PCard from '../card/Card'
import axios from '../../api/index'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreatePost from '../create_post/CreatePost'



const useStyles = makeStyles({
    root: {
      maxWidth: 700,
      marginLeft : 'auto',
      marginRight : 'auto',
      marginTop : 90,
      marginBottom : 30
    },
    media: {
      height: 140,
    },
  });



export default function MediaCard() {

  
    const classes = useStyles();
    const [ isLoggedIn , setIsLoggedIn ] = useState(false)

    const [ post , setPost ] = useState([])
    const [ isOpenCreatePost , setIsOpenCreatePost ] = useState(false)


     /** 
      * * CHECKING IF THE CREATE POST DIALOG IS OPEN OR NOT */
    const handleClick = () => {
        setIsOpenCreatePost( !isOpenCreatePost )
        console.log("clicked")
    }


    /* FETCHING THE DATA FROM THE API ( /api/post )*/ 
    useEffect( () =>{
        async function fetchData(){
            const req = await axios.get('/api/post')
            setPost(req.data)
        }

        fetchData()
        
        
    })

    

    /**
     *  * MAPPING THE RESULTS IN THE REVERSE ORDER 
     * */
    let list = post.slice(0).reverse().map( posts => {
        return <PCard key={posts._id} title={posts.title} desc={posts.description} date={posts.date} />
    })


 
  return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={ handleClick}>
                Create Post
            </Button>
            { isOpenCreatePost && <CreatePost click_func={handleClick}/>}
            {list}
        </div>
  );
}