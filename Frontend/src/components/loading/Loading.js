import React, {useEffect} from 'react'
import lottie from 'lottie-web';
import loadingIcon from '../../assets/animation/animation_ktzru9cy.json'
import { makeStyles } from '@material-ui/core/styles';
import './Loading.css'



const useStyles = makeStyles((theme) => ({

    loading__icon__div:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textAlign: 'center'
    },

    
  }));


export default function Loading({active}) {

    const classes = useStyles();

    useEffect( () => {
        lottie.loadAnimation({
            container: document.querySelector("#loading-icon"),
            animationData: loadingIcon,
          });
    })


    return (
        <div >
            { active && 
            
                <div className={classes.loading__icon__div}>
                   <div id='loading-icon' >
                       
                   </div>
                   <p className='loading__text'>Loading you up! Please wait.</p>
                </div>}
        </div>
    )
}
