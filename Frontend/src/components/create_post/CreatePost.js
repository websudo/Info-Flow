import React from 'react';
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
    }
  });


  export default function MediaCard({click_func}) {
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
    



    /** 
     * ! This is how you should update a object in state,
     * * Property name is comming as a prop like ( title , description )
     * */
      const handleChange = (prop) => (event) => {
        
        setValues({ ...values, [prop]: event.target.value });
      };





      /** 
     * * SENDING DATA TO THE SERVER IF NEITHER OF THEM IS NULL
     * */
      const handleSubmit = () =>{
          if( values.title && values.description){
              axios.post( '/api/post' , values )
              .then( res => {
                console.log(res);

                /**
                 * * On Successfull Posting close the dialog box 
                 */
                click_func();
              })
          }

          else{
              console.log( " Parameters missing ")
          }
      }

 
  return (
        <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <CloseIcon  onClick={() => click_func()} className={classes.close__icon}/>
        </CardActions>
        
        <CardContent>
        <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            onChange={handleChange('title')}
          />
          
        </FormControl>
        
        <FormControl fullWidth className={classes.margin}>
        
          <InputLabel htmlFor="desc">Description</InputLabel>
          <Input
            id="desc"
            onChange={handleChange('description')}
          />
        </FormControl>

        

        </CardContent>
  
        <CardActions>
        <Button 
            size="small" 
            color="primary"
            onClick = { handleSubmit }
            >
            Post
        </Button>
        </CardActions>
    </Card>
  );
}