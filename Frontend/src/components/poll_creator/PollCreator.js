import React,{ useState, useRef, useEffect} from 'react';
import {useStateWithCallbackLazy} from 'use-state-with-callback'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from '../../api/index'
import {io} from 'socket.io-client'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Scrollbar } from "react-scrollbars-custom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./PollCreator.css"

/**
 * * Snackbar Imports 
 */
 import Snackbar from '@material-ui/core/Snackbar';
 import MuiAlert from '@material-ui/lab/Alert';
import { createDispatchHook } from 'react-redux';
import { red } from '@material-ui/core/colors';

/**
   * * Alert Function 
   */
 function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles({
    root: {
        width:"500px",
        maxWidth: '800px',
        minHeight: '300px',
        maxHeight: '700px',
    
        zIndex: '20000',

        ['@media (max-width: 420px)']:{
            marginLeft: 15,
            marginRight: 15,
        },
    },

    media: {
      height: 140,
    },

    close__icon__bar:{
        display: 'flex',
        width: '100%',
        backgroundColor: 'rgba(63,81,181)',
        marginBottom : 0,
    },


    close__icon : {

        marginLeft: 'auto',
        marginRight: '2%',
        color: 'white',
        '&:hover': {
            background: 'rgba(65, 65, 65, 0.8)',
        },

        cursor: 'pointer',
    },

    back__icon:{
        
      color: 'white', 
      cursor: 'pointer',
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
    },

    box:{
      maxHeight: '300px',
      overflow: 'scroll',
      padding: '1%',
      marginTop: '1%',
      overflowX: 'hidden',
    }
  });

export default function PollCreator({handlePollIconClick, handleCloseCreatePoll, handleBackCreatePoll}) {

    const classes = useStyles();
    const isFirstRender = useRef(true);
    console.log( "open");

    const [open, setOpen] = useState(false);
    const [pollTitle, setPollTitle] = useState({
      title: '',
    })

    const [pollDesc, setPollDesc] = useState();

    const [optionList, setOptionList] = useState([{option:"", count: 0},{option:"", count:0}]);

    const socket = useRef();

    useEffect( () =>{
      socket.current = io("https://infofloww.herokuapp.com/");
    },[])

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }

      setOpen(false);
    };

    const handleChange = (option) => (event) =>{
     
        setPollTitle( { ...pollTitle, [option] : event.target.value});
        
    }

    const handleInputChange = (e, index) => {
      const {name,value} = e.target;
      const list = [...optionList];
      list[index][name] = value;
      setOptionList(list);
      console.log( optionList)
    };


    const handleDescChange = (e) => {
      console.log(e.target.value);
      setPollDesc(e.target.value);
    }

    const handleRemoveClick = index => {
      const list = [...optionList];
      list.splice(index, 1);
      setOptionList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setOptionList([...optionList, { option: "", count: 0 }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        

            const payload = {
              creator_id:  JSON.parse(localStorage.getItem('profile')).data.user.id,
              createdby: JSON.parse(localStorage.getItem('profile')).data.user.name,
              title: pollTitle.title,
              option: optionList,
              description: pollDesc,
              active: true,
              submitted_by: [],
              not_submitted: [],
              total_vote: 0,
            }

        
            console.log(payload);

            try{
              const res = axios.post('/api/poll', payload);
              res.then((response) => {

                console.log(response.data._id)
                socket.current.emit("getpoll", {
                  creator_id:  JSON.parse(localStorage.getItem('profile')).data.user.id,
                  id: response.data._id,
                  title : pollTitle.title,
                  description: pollDesc,
                  optionList,
                  submitted_by: [],
                  not_submitted: [],
                  total_vote: 0,
                })

              },
              (err) => console.log(err))
            }
            catch(err){
              console.log(err);
            }
            
    }

    
  return (
    <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <ArrowBackIcon className={classes.back__icon} onClick={handleBackCreatePoll}/>
            <p className="poll_creator_title">Create Poll</p>
            <CloseIcon  onClick={() => handleCloseCreatePoll()} className={classes.close__icon}/>
        </CardActions>
        

        {/**
         * ! Remember to use encType while using formData 
         */}
        <form onSubmit={handleSubmit} encType='application/x-www-form-urlencoded' > 

        <CardContent>


        <FormControl fullWidth className={classes.margin}>

        <label htmlFor='title' className={classes.label__input}>Title</label>
        <input className={classes.title__input} id="title" onChange={handleChange('title')} placeholder="Title of Poll" required ></input> 

        <label htmlFor='desc' className={classes.label__input}>Description</label>
        <TextareaAutosize 
          minRows={3}
          id="desc"
          aria-label="maximum height"
          placeholder="Enter description.."
          onChange={handleDescChange}
          required
        /> 
        
        </FormControl>

        
        <div className={classes.box}>
          {optionList.map((x, i) => {
          return (
            <div>
              
              <FormControl fullWidth className={classes.margin}>
                <input 
                  name="option"
                  className={classes.title__input} 
                  id="title" 
                  placeholder="Enter option" 
                  value={x.option} 
                  onChange={e => handleInputChange(e,i)} 
                  required >
                </input>  
              </FormControl>

              <div className="btn-box">
                {optionList.length !== 1 && <button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}>Remove</button>}
                {optionList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
              </div>
            </div>
          );
        })}
      </div>

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

        {/* { uploading &&
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
        } */}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                    Maximum file upload limit is 5! Please try again.
                    </Alert>
            </Snackbar>
        
    </Card>
  );
}
