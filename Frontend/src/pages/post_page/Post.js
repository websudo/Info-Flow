import React, { useState , useEffect, useRef} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Card from '../../components/card/Card'
import CreateComment from '../../components/create_comment/CreateComment'
import { useLocation } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CommentCard from '../../components/comment-card/CommentCard'
import Button from '@material-ui/core/Button';
import axios from '../../api/index'


const useStyles = makeStyles({
    post__page__main: {
      maxWidth: 900,
      marginLeft : 'auto',
      marginRight : 'auto',
      marginTop : 90,
      marginBottom : 30
    },
    media: {
      height: 140,
    },

    comment__area:{
        marginTop: 50,
        display : 'flex',
        flexDirection : 'column'
    },

    comment__button:{
        marginTop : 20,
        marginLeft : 'auto'
    }
  });


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

export default function Post() {

    const classes = useStyles();
    const location = useLocation();
    const state = location.state;


    const [ post , setPost ] = useState({})
    const [ refresh , setRefresh ] = useState( false )
    const [ isLoggedIn , setIsLoggedIn ] = useState(false)
    const [ isOpenCreateComment , setIsOpenCreateComment ] = useState(false)
    const [ list , setList ] = useState([])
    const [ comments , setComments ] = useState({})


     /** 
      * * CHECKING IF THE CREATE Comment DIALOG IS OPEN OR NOT 
      * */
      const handleClick = () => {
        setIsOpenCreateComment( !isOpenCreateComment )
    }

    const handleRefresh = () => {
      setRefresh( !refresh)
    }


    useEffect( () => {

        if( localStorage.getItem('profile')){
          setIsLoggedIn(true)
        }
        else{
          setIsLoggedIn(false)
        }
      }, [location]);


      useEffect( () =>{
        console.log( " Hello ")
        async function fetchData(){
            const req = await axios.get('/api/post')
            console.log( state.id , post , req.data)

            req.data.map( item => {
              console.log(item._id)
              if( item._id == state.id ){
                console.log(item, " Item matched ")
                setPost(post => item)
              }
              
            })

        }

        fetchData()
      },[refresh]) 


    useDidMountEffect( ( ) => {

      let comments = post.comment.map( comment => {
        return comment
      })

      setComments( comments )
  

      let list = post.comment.slice(0).reverse().map( comment => {
          return <CommentCard comment={comment.comment} date={comment.date} createdby={comment.createdby} />
      })

      setList(list)

    }, [post])
    


    return (
            <div className="post__page">
			{/* header */}
			<div className="post__page__header">
				<Navbar />
			</div>
			{/* main */}
			<div className={ classes.post__page__main }>
                <Card id={post.id} title={post.title} desc={post.description} date={post.date} createdby={post.createdby} creatorid={post.creator_id} /> 
                
                <div className={classes.comment__area}>
                    <Typography variant="h6" component="h2" gutterBottom class>
                        Comments
                    </Typography>
                    <Divider />

                    {list}

                    {  isOpenCreateComment && <CreateComment click_func={handleClick} handlerefresh={handleRefresh} comments={ comments } id={post._id} title={post.title} desc={post.description} date={post.date} createdby={post.createdby} creatorid={post.creator_id}/>}

                    { isLoggedIn && <Button variant="contained" color="primary" className={ classes.comment__button} onClick={ handleClick}>
                        Post Comment
                    </Button>
                    }

                </div>
            </div>
        </div>
    )
}
