import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../api/index'


const useStyles = makeStyles({
    root: {
      maxWidth: '100%',
      marginTop : 20,
    },
    media: {
      height: 140,
    },

    close__icon__bar:{
        display: 'flex',
        justifyContent : 'flex-end',
        marginBottom : 0,
    },

    close__icon : {
    
        '&:hover': {
            background: '#a6a6a6',
        },
    },

    label__input:{
      fontWeight: 'bold',
      fontSize : 17,
      marginTop: 0
    },

    comment__input:{
      marginTop:10,
      marginBottom:10,
      padding: 10,
      border : '1px black solid',
      borderRadius: 4,
      fontSize: 15,
    },

    post__button:{
      marginLeft: 'auto',
      marginRight: 10,
      marginBottom: 10,
      width: 70
    }

  });


  export default function MediaCard(props) {

    console.log(props.comments)
    const classes = useStyles();

    

    /** 
     * *STATE TO MANAGE THE DATA FROM CREATE COMMENT
     * */
    const [values, setValues] = React.useState({
        _id : props.id,
        creator_id : props.creatorid,
        createdby : props.createdby,
        title: props.title,
        description: props.desc,
        comment :props.comments,
        date : props.date,
      });
    

    const [ newcomment , setNewComment ] = useState({})
    const [ isUpdated , setIsUpdated ] = useState(false)

    /** 
     * ! This is how you should update a object in state,
     * * Property name is comming as a prop like ( title , description )
     * */
      const handleChange = (prop) => (event) => {

        setNewComment({ 
          comment : event.target.value,
          createdby : JSON.parse(localStorage.getItem('profile')).data.user.name
        })
      
      };


    
        /** 
     * * SENDING DATA TO THE SERVER IF NEITHER OF THEM IS NULL
     * */
         const handleSubmit = () =>{
          console.log(newcomment)
          const all_comment = values.comment.concat(newcomment)
          console.log( all_comment)

          setValues({ ...values, comment : [ ...values.comment , newcomment]} );
          console.log( values)
          setIsUpdated( !isUpdated)
        }

        if(isUpdated){
          
            console.log( "useEffect  " , values)
              if( newcomment.comment){
                axios.post( '/api/post' , values )
                .then( res => {
                  console.log(res);
                  setIsUpdated(!isUpdated)
                  /**
                   * * On Successfull Posting close the dialog box 
                   */
                  props.handlerefresh()
                  props.click_func();
  
                  /**
                   * * On Successfull Posting Fetch the data from api 
                   */
      
                })
            }
  
            else{
                console.log( " Parameters missing ")
            }
          
        }
        
        
 



  return (
        <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <CloseIcon  onClick={() => props.click_func()} className={classes.close__icon}/>
        </CardActions>
        
        
        <CardContent>
        
        
        <FormControl fullWidth className={classes.margin} >
   
        <label htmlFor='comment' className={classes.label__input}>Comment</label>
        <input className={classes.comment__input} id="comment" onChange={handleChange('comment')} placeholder="Write comment here" ></input>  

        </FormControl>

        

        </CardContent>
  
        <CardActions>
        <Button 
            size="small" 
            color="primary"
            onClick = { handleSubmit }
            className={classes.post__button}
            variant='contained'
            >
            Post
        </Button>
        
        </CardActions>
        
    </Card>
  );
}