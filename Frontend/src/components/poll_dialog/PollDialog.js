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
import AddBoxIcon from '@mui/icons-material/AddBox';
import PreviewIcon from '@mui/icons-material/Preview';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Divider from '@mui/material/Divider';

import "./PollDialog.css"


const useStyles = makeStyles({
    root: {
        width:"500px",
        maxWidth: '800px',
        minHeight: '200px',
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
    }
  });

export default function PollDialog({handleCreatePollIconClick, handlePollViewerIconClick, handleClosePollDialog}) {
    const classes = useStyles();

  return (
    <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <p className='poll__dialog__title'>Choose option</p>
            <CloseIcon  className={classes.close__icon} onClick={handleClosePollDialog}/>
        </CardActions>
 
        <CardContent className="poll__dialog__body">
            <div className='create__poll' onClick={handleCreatePollIconClick}>
                <AddBoxIcon  className='create__poll__icon' sx={{ fontSize: 100}}/>
                <p className='icon__caption'> Create new poll </p>
            </div>

            <div className="divider__polldialog"></div>

            <div className='view__poll' onClick={handlePollViewerIconClick}>
                <PreviewIcon className='view__poll__icon' sx={{ fontSize: 100}}/>
                <p className='icon__caption'>View previous polls.</p>
            </div>
        </CardContent>

    </Card>
  )
}
