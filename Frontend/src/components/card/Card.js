import React,{useState , useEffect , useRef } from 'react';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../api/index';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import zIndex from '@material-ui/core/styles/zIndex';

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
      //backgroundColor : '#757575'
    },
    borderRadius: '50%'
  },

  post__header : {
    
  },

  user__name: {
    marginRight: 'auto',
  },

  card__content:{
    backgroundColor: '#fafafa',
  }
});




export default function MediaCard(props) {
  const classes = useStyles();
  

  /**
   * * Date and Time parsing */
  const date = moment(props.date , "YYYY-MM-DD")._pf.parsedDateParts.toString().replace(/,/g,'/')
  const time = moment(props.date , "hh:mm:ss")._pf.parsedDateParts.toString().replace(/,/g,':').substr(3)


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    
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
          
          <Grid item>
            <Tooltip title="Delete" arrow placement="right">
              <DeleteIcon 
              className={classes.delete__icon}
              onClick={handleClickOpen}
              />
            </Tooltip>
          </Grid>
          
        }
        


      </CardActions>
      <CardActionArea>
        <Link to={{
            pathname : '/postpage',
            state : {
              id : props.id
            }
        }} 
        style={{ textDecoration : 'none' , color : 'black'}} >
          <CardContent className={ classes.card__content}>
            <Typography gutterBottom variant="h5" component="h2">
              { props.title }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.desc }
            </Typography>
          </CardContent>
        </Link>
      

      </CardActionArea>
      
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
            {date}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
            {time}
        </Typography>

      </CardActions>



      
      {/**
       * zIndex 7 so as to display it below the loading page
       */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ 
          zIndex : '7 !important',
        }}
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


    </Card>


        
  );
}