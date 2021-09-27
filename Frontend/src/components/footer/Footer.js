import React from 'react'
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import './Footer.css'
import InstagramIcon from '../../assets/contact/instagram.png'
import LinkedinIcon from '../../assets/contact/linkedin.png'
import GithubIcon from '../../assets/contact/github.png'

const useStyles = makeStyles({

    main__footer:{
        marginTop: 150,
        width: '100%',
        paddingBottom: 50,
        backgroundColor: '#333',
        paddingTop: 30,
    },

    list:{
        color: 'white',
        textAlign: 'start',

    },

    list__div:{
        marginTop: 60,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },

    contact__icon:{
        maxWidth: 40,
        marginRight: 20,
        marginLeft: 20,
        ['@media (max-width: 420)']:{
            width: 20,
        },
    },

    contact__list:{
        color: 'white',

    },

    contact__icon__div:{
        display: 'flex',
    },

    footer__list__item:{
        textDecoration: 'none',
        color: 'white',
        ['@media (max-width: 420)']:{
            fontSize: 25,
        },
    }
  });

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.main__footer}>
            {/*<p className='footer__title'> Connect </p>*/}

            <div className={classes.list__div}> 

                <div className={classes.list}>
                    <p className='footer__title'>Title</p>
                    <ul style={{ listStyleType: 'none' , paddingLeft: '0' , textDecoration: 'none'}}>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                    </ul>
                </div>
                <div className={classes.list}>
                    <p className='footer__title'>Title</p>
                    <ul style={{ listStyleType: 'none' , paddingLeft: '0'}}>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                    </ul>
                </div>
                <div className={classes.list}>
                    <p className='footer__title'>Title</p>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0'}}>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                        <a href='#' className={classes.footer__list__item}><li>random1</li></a>
                    </ul>
                </div>

                <div className={classes.contact__list}>
                    <p className='footer__title'>Follow@</p>
                    <div className={classes.contact__icon__div}>
                        
                        <a href='https://github.com/websudo' target='_blank'><img src={GithubIcon} className={classes.contact__icon}></img></a>
                        <a href='https://www.linkedin.com/in/ritik-nair' target='_blank'><img src={LinkedinIcon} className={classes.contact__icon}></img></a>
                        <a href='https://www.instagram.com/ritik_nair101/' target='_blank'><img src={InstagramIcon} className={classes.contact__icon}></img></a>
                    
                     </div>
                    
                </div>
            </div>
            
        </div>
    )
}
