import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../api/index'
import FileBase from 'react-file'


const useStyles = makeStyles({
    root: {
      maxWidth: '100%',
      marginTop : 20
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

    title__input:{
      marginTop:10,
      marginBottom:10,
      padding: 10,
      border : '1px black solid',
      borderRadius: 4,
      fontSize: 15,
    },

    description__input:{
      marginTop:10,
      padding: 10,
      border : '1px black solid',
      borderRadius: 4,
      fontSize: 15,
      height: 150,
    },

    label__input:{
      fontWeight: 'bold',
      fontSize : 17,
      marginTop: 0
    },

    post__button:{
      marginLeft: 'auto',
      marginRight: 10,
      marginBottom: 10,
      width: 70,
      textTransform: 'none'
    }
  });


  export default function MediaCard({click_func , handleRefresh}) {
    const classes = useStyles();


    /** 
     * *STATE TO MANAGE THE DATA FROM CREATE POST  
     * */
    const [values, setValues] = React.useState({
        creator_id : JSON.parse(localStorage.getItem('profile')).data.user.id,
        createdby : JSON.parse(localStorage.getItem('profile')).data.user.name,
        title: '',
        description: '',
      });
    

    const [ file , setFile] = useState({
      files: '',
    })

    /** 
     * ! This is how you should update a object in state,
     * * Property name is comming as a prop like ( title , description )
     * */
      const handleChange = (prop) => (event) => {
        
        setValues({ ...values, [prop]: event.target.value });
        
        if( prop == 'upload'){
          console.log(event.target.files)
          setFile( {files : event.target.files})
        }
      };


      /** 
     * * SENDING DATA TO THE SERVER IF NEITHER OF THEM IS NULL
     * */
      const handleSubmit = (e) =>{
          e.preventDefault();

          if(file.files){

            const formData = new FormData();
            formData.append("creator_id",values.creator_id);
            formData.append("createdby",values.createdby);
            formData.append("title",values.title);
            formData.append("description",values.description);
            
            const n = file.files.length;
            for( var i=0 ; i < n ; i++){
              formData.append("upload",file.files[i]);
            }
            


            axios.post('/api/post', formData)
            .then( res => {
            
              console.log(res);
              click_func();
              handleRefresh();
            })
            .catch( err => {
              console.log(err)
            })
            
          }
          else{
            const formData = new FormData();
            formData.append("creator_id",values.creator_id);
            formData.append("createdby",values.createdby);
            formData.append("title",values.title);
            formData.append("description",values.description);
            
           

            axios.post('/api/post', formData)
            .then( res => {
            
              console.log(res);
              click_func();
              handleRefresh();
            })
            .catch( err => {
              console.log(err)
            })
          }

      }

 
  return (
        <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <CloseIcon  onClick={() => click_func()} className={classes.close__icon}/>
        </CardActions>
        

        {/**
         * ! Remember to use encType while using formData 
         */}
        <form onSubmit={handleSubmit} encType="multipart/form-data"> 

        <CardContent>


        <FormControl fullWidth className={classes.margin}>

        <label htmlFor='title' className={classes.label__input}>Title</label>
        <input className={classes.title__input} id="title" onChange={handleChange('title')} placeholder="Title of Post" required ></input>  
        </FormControl>
        


        <FormControl fullWidth className={classes.margin}>
       
        <label htmlFor='desc' className={classes.label__input}>Description</label>
        <textarea className={classes.description__input} id="desc" onChange={handleChange('description')} placeholder="Description of Post"  required></textarea> 

        <input type='file' filename="upload" onChange={handleChange('upload')} multiple></input>
        </FormControl>

        

        </CardContent>
  
        <CardActions>
        <Button 
            size="small" 
            color="primary"
            variant="contained"
            type="submit"
            className={classes.post__button}
            disableElevation
            >
            Post
        </Button>
        </CardActions>

        </form>
    </Card>
  );
}