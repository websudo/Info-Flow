import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import messageimg from '../../assets/logo/logo1.png';

/**
 * * Very Awesome library
 */
import { format } from 'timeago.js'

const useStyles = makeStyles({

    "::-webkit-scrollbar":{
        width: 20,
      },
      
    "::-webkit-scrollbar-track": {
      backgroundColor: 'black',
    },
      
    "::-webkit-scrollbar-thumb":{
      background: '#4e4e4e',
      borderRadius: 25,
      },

    message:{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 10,
    },

    message__img:{
        width: 30,
        height: 30,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 10,
        
    },

    message__top:{
        display: 'flex',
    },

    message__text:{
        maxWidth:  300,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#6dafe8',
        color: 'white',
    },

    message__bottom:{
        fontSize: 12,
        marginTop: 10,
    },

    messageown:{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'flex-end',
        
    },

    messageown__text:{
        maxWidth:  300,
        padding: 10,
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#dbdbdb',
    }
  });

export default function Message( {message, own} ) {
    const classes = useStyles();

    console.log( message , own)
    return (
        <div className={ own ? classes.messageown:classes.message} >
            <div className={classes.message__top}>
                <img src={messageimg}  className={classes.message__img}></img>
                <p className={ own ? classes.messageown__text:classes.message__text}>{message.text}</p>
            </div>


            {/** Add timestamp to model of message
             * * So as to get the created at time
             * * and use timeago library function format
             * * to format the time.
             * * Timestamp 1:08:41
             * * LAMA DEV
             */}
            <div className={classes.message__bottom}>
                {format(message.createdAt)}
            </div>
        </div>
    )
}
