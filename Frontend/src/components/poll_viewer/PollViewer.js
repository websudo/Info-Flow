import React,{ useState, useRef, useEffect} from 'react';
import {useStateWithCallbackLazy} from 'use-state-with-callback'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
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
import AddBoxIcon from '@mui/icons-material/AddBox';
import PreviewIcon from '@mui/icons-material/Preview';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./PollViewer.css"


const useStyles = makeStyles({
    root: {
        width: 500,
        maxWidth: '800px',
        minHeight: '200px',
        maxHeight: '720px',
        zIndex: '20000',

        ['@media (max-width: 420px)']:{
            marginLeft: 15,
            marginRight: 15,
        },

        ['@media (max-height: 740px)']:{
            maxHeight: '500px',
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
    },

    poll__details:{
        marginTop: 10,
        marginBottom: 10,
        overflow: 'auto',
        ['@media (max-height: 740px)']:{
            marginLeft: 10,
            marginRight: 10,
            flex: 1,
            height: 300,
            minWidth: 250,
        },
    }
  });

export default function PollDialog({handleClosePollViewer, handleBackPollViewer}) {
    const classes = useStyles();

    const [pollsList, setPollsList] = useState();

    useEffect( () => {
        try{
            const res = axios.get('/api/poll');
            res.then( response => {
                console.log(response.data);
                setPollsList(response.data);
            })
        }
        catch(err){
            console.log(err);
        }
    },[])


  return (
    <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <ArrowBackIcon className={classes.back__icon} onClick={handleBackPollViewer}/>
            <p className='poll__viewer__title'>Previous Polls</p>
            <CloseIcon  className={classes.close__icon} onClick={handleClosePollViewer}/>
        </CardActions>
 
        <CardContent className="poll__viewer__body">
            {pollsList?.map( (e) =>(
                <Card className={classes.poll__details}>
                    <CardActions className={ classes.post__header}>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.user__name}>

                            Posted by {e.createdby}
                            
                        </Typography>
                        
                    </CardActions>
                    
                    <p className='poll_title'>{e.poll_title}</p>

                    <CardActionArea>
                        <CardContent className={ classes.card__content}>
                            { e.option_list.map( o => (
                                <div className='option'>
                                    <div className='option__name'>
                                        
                                        <p className='option__p'>{o.option}</p>
                                       <div className='option__name__bar' style={{ backgroundColor: 'rgba(54, 162, 235, 0.2)', width:`${e.submitted_by.length !== 0?Math.round(((o.count/e.submitted_by.length)*100)):0}%`}}>
                                  
                                        </div> 
                                    </div>
                                    <div className='option__count'>
                                        <p className='option__p'>{o.count} ({e.submitted_by.length !== 0?((o.count/e.submitted_by.length)*100).toFixed(2):0}%)</p>
                                    </div>
                                </div>
                            ))}
                            <p className='total__vote'>Total vote: {e.submitted_by.length}</p>
                        </CardContent>
                
                    </CardActionArea>

                </Card>
            ))
            }
        </CardContent>

    </Card>
  )
}
