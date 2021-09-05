import React, { useEffect , useState , useContext, useRef} from 'react';
import PCard from '../card/Card'
import axios from '../../api/index'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreatePost from '../create_post/CreatePost'
import { useLocation  } from 'react-router';

/**
 * * Snackbar Imports 
 */
 import Snackbar from '@material-ui/core/Snackbar';
 import MuiAlert from '@material-ui/lab/Alert';



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


   /**
   * * Alert Function 
   */
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  

    const useDidMountEffect = (func, deps) => {
      const didMount = useRef(false);
    
      useEffect(() => {
        if (didMount.current) {
          func();
        } else {
          didMount.current = true;
        }
      }, deps);
    };

export default function MediaCard() {

  
    const classes = useStyles();
    const location = useLocation();

    const [ isLoggedIn , setIsLoggedIn ] = useState(false)

    const [ post , setPost ] = useState([])
    const [ isOpenCreatePost , setIsOpenCreatePost ] = useState(false)
    const [ refresh , setRefersh ] = useState( true )
    const [ username , setUsername ] = useState({})
    
    const [open, setOpen] = React.useState(false);


    /*if( isLoggedIn ){
      setOpen(true);
      console.log( "Snackbar")
      break;
    }*/
        
   
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

     /** 
      * * CHECKING IF THE CREATE POST DIALOG IS OPEN OR NOT 
      * */
    const handleClick = () => {
        setIsOpenCreatePost( !isOpenCreatePost )
    }


    /**
     * * Checking if the data needs to be fetched from the API or not 
     */
    const handleRefresh = () => {
        setRefersh( !refresh)
    }


    /* 
    * *FETCHING THE DATA FROM THE API ( /api/post )
    */ 
    useEffect( () =>{
        async function fetchData(){
            const req = await axios.get('/api/post')
            console.log( post , req.data)
            if( post != req.data ){
              console.log( "not same")
            setPost(req.data)}
        }

        fetchData()
        
    },[refresh]) 


    

    useEffect( () => {

      if( localStorage.getItem('profile')){
        setIsLoggedIn(true)
        setUsername(JSON.parse(localStorage.getItem("profile")).data.user.name)
        setOpen(true)

      }
      else{
        setIsLoggedIn(false)
      }
    }, [location]);
    



    /**
     *  * MAPPING THE RESULTS IN THE REVERSE ORDER 
     * */

    let list = post.slice(0).reverse().map( posts => {
        return <PCard key={posts._id} id={posts._id} title={posts.title} desc={posts.description} date={posts.date} createdby={posts.createdby} creatorid={posts.creator_id} comments={posts.comment} handleRefresh={handleRefresh} />
    })

    
  return (
        <div className={classes.root}>
          {
            isLoggedIn && 
            <Button variant="contained" color="primary" onClick={ handleClick}>
                Create Post
            </Button>

          } 
            { isOpenCreatePost && <CreatePost click_func={handleClick} handleRefresh={handleRefresh}/>}
            {list}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Welcome {username }!
                    </Alert>
            </Snackbar>
        </div>
  );
}