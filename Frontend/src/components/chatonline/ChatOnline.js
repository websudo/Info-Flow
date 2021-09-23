
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import React from 'react'
import onlineimg from '../../assets/logo/logo1.png'



const useStyles = makeStyles({
    
    chatonline__friend:{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        cursor: 'pointer',
        marginTop: 10,
    },

    chatonlineimg: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid white',
    },

    chatonlineimg__div:{
        position: 'relative',
        marginRight: 10,
    },

    chatonline__badge:{
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '50%',
        top: 2,
        right: 2,
        backgroundColor: 'green',
    }
  });




export default function ChatOnline() {
    const classes = useStyles();

    return (
        <div className={classes.chatonline}>
            <div className={classes.chatonline__friend}>
                <div className={classes.chatonlineimg__div}>
                    <img className={classes.chatonlineimg} src={onlineimg}></img>
                    <div className={classes.chatonline__badge}></div>
                </div>
                <span className={classes.chatonline__name}> Jane Doe </span>
            </div>
        </div>
    )
}
