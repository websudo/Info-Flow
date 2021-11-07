import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import offlineimg from '../../assets/background/Nointernet_new1.png';
import './Offline.css'



const useStyles = makeStyles((theme) => ({

    offline__container:{
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
    },

    offline__div:{
        marginRight: 'auto',
        marginLeft: 'auto',
        // marginTop: 'auto',
        // marginBottom: 'auto',
        textAlign: 'center',
        zIndex: 100,
        width: '900px',
        ['@media ( max-width: 420px )']:{
            width: '300px',
        }
    },

    offline__img:{
        //width: 500,
        width: 300,
        ['@media ( max-width: 420px )']:{
            width: '200px',
        }
    }

    
  }));

export default function Offline() {
    const classes = useStyles();    

    return (
            <div className={classes.offline__container}>
                    <div className={classes.offline__div}>
                        <img  className={classes.offline__img} src={offlineimg}/>
                        <p className='offline__title'>NO INTERNET CONNECTION</p>
                        <p className='offline__desc'>Check your internet connection and try again</p>
                    </div>
                </div>       
    
    )
}
