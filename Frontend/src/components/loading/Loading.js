import React, {useEffect} from 'react'
import lottie from 'lottie-web';
import loadingIcon from '../../assets/animation/animation_ktzru9cy.json'
import { makeStyles } from '@material-ui/core/styles';
import './Loading.css'



const useStyles = makeStyles((theme) => ({

    loading__container:{
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
    },

    loading__icon__div:{
        // marginRight: 'auto',
        // marginLeft: 'auto',
        // marginTop: 'auto',
        // marginBottom: 'auto',
        textAlign: 'center',
        zIndex: 100,
        width: '300px',
        ['@media ( max-width: 420px )']:{
            width: '200px',
        }
    },

    
  }));


export default function Loading({active}) {

    const classes = useStyles();

    const loading__text= [ "Gettings your boat ready to sail" , "Loading up your cargo...", "Preparing for safe exploration...", " Letting that Info flow ", " Keep calm and sail"];

    function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 

    useEffect( () => {
        lottie.loadAnimation({
            container: document.querySelector("#loading-icon"),
            animationData: loadingIcon,
          });
    })

    

    return (
        <div>
            { active && 
                <div className={classes.loading__container}>
                    <div className={classes.loading__icon__div}>
                        <div id='loading-icon' />
                        <p className='loading__text'>{ loading__text[randomNumber(0,4)] }</p>
                    </div>
                </div>
            }
        </div>
    )
}
