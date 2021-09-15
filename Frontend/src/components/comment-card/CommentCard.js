import React from 'react';
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../api/index';
import Divider from '@material-ui/core/Divider';

/*const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);*/


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop : 20,
    //backgroundColor: '#333',
    //color: 'white'
  },

  media: {
    height: 140,
  },

  delete__icon: {
    marginLeft: 'auto',
    marginRight : 0,
    '&:hover':{
      cursor : 'pointer',
      backgroundColor : '#cecece'
    },
  },

  post__header : {
    
  },

  user__name: {
    marginRight: 'auto',
  },

  divider: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem'
  },

  card__content:{
    backgroundColor: '#fafafa',
  }
});



export default function MediaCard(props) {
  const classes = useStyles();
  console.log(props.date)
  const deleteHandler = () => {
      console.log(props)

      axios.delete( '/api/post' , { data : { id : props.id , user : props.createdby}})
      .then( res => {
        console.log(res);

        /**
         * * On Successfull Deletion Fetch the data from API
         */
        props.handleRefresh();
      })
      .catch( err => {
        console.log( err )
      })
  }
  
  return (
    <Card className={classes.root}>
      <CardActions className={ classes.post__header}>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.user__name}>

            Posted By { props.createdby }
            
          </Typography>

        
        { 

          /**
           * * Delete button will only be visible if 
           * * The creator_id associated with the post is 
           * * equal to the currently signed in user 
           */
          (JSON.parse(localStorage.getItem('profile'))) && 
          props.creatorid == JSON.parse(localStorage.getItem('profile')).data.user.id  && 
          <DeleteIcon 
          className={classes.delete__icon}
          onClick={deleteHandler}
          />
        }
        
  
      </CardActions>




      <CardActionArea>
        
          <CardContent className={classes.card__content}>
            <Typography variant="body1" color="textPrimary" component="p">
              { props.comment }
            </Typography>
          </CardContent>
      
      </CardActionArea>
      




      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">

            { /* DATE PARSING */}
            {moment(props.date , "YYYY-MM-DD")._pf.parsedDateParts.toString().replace(/,/g,'/')}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
            {moment(props.date , "hh:mm:ss")._pf.parsedDateParts.toString().replace(/,/g,':').substr(3)}
        </Typography>

      </CardActions>
    </Card>
  );
}