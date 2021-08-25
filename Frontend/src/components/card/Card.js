import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../api/index';


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop : 20
  },
  media: {
    height: 140,
  },

  delete__icon: {
    marginLeft: 'auto',
    marginRight : 0,
    
  },

  post__header : {
    
  },

  user__name: {
    marginRight: 'auto',
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  const deleteHandler = () => {
      console.log(props)

      axios.delete( '/api/post' , { data : { id : props.id , user : props.createdby}})
      .then( res => {
        console.log(res)
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { props.title }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { props.desc }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">

            { /* DATE PARSING */}
            { moment(props.date , "YYYY-MM-DD")._pf.parsedDateParts.toString().replace(/,/g,'-') }
            
          </Typography>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}