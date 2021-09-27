import React,{useState , useEffect , useRef } from 'react';
import { makeStyles , withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../api/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import download from 'downloadjs'
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import GetAppIcon from '@material-ui/icons/GetApp';

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
    ['@media (max-width: 420px)']:{
      marginLeft: 15,
      marginRight: 15,
    },
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



  user__name: {
    marginRight: 'auto',
  },

  attach__image:{
    width: 220,
    marginLeft: 20,
    marginBottom:20,
    
    //backgroundColor: '#5c5c5c',
  },


  attach__file:{
    maxHeight: 50,
    width: 220,
    marginLeft: 20,
    marginBottom:20,
    //backgroundColor: '#5c5c5c',
    
  },

  files__block:{
    display: 'flex',
    flexWrap: 'wrap',
  },

  card__content:{
    backgroundColor: '#fafafa',
  }
  
});




export default function MediaCard(props) {
  const classes = useStyles();
  console.log(props)

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


  const handleDownload = (prop) => (event) => {
      download(prop);
  }

  const files_list = props.upload && props.upload.map( (file) => {
    let file_extension = file.split('.').pop();
    console.log( file_extension)
   
    if( file_extension == 'jpg' || file_extension == 'jpeg' || file_extension == 'png'){
     
            return (
              <Card className={classes.attach__image}>
                    {/*<CardHeader
                      action={
                        <IconButton aria-label="Download">
                          <GetAppIcon 
                            onClick={handleDownload(`/uploads/${file}`)} 
                            style={{ margin: '0' , height: '60' , width : '60' }}
                            fontSize='small'
                            />
                        </IconButton>
                      }

                      subheader={file}
                      style={{ height : '50px' , marginTop: '0', paddingBottom:'0', border:'1px solid black'}}
                    />*/}

                      <CardContent  style={{display: 'flex' ,  width:'100%' , height:'50px' , overflow:'hidden', marginBottom: '10px'}}>
                          <Typography gutterBottom variant="b5">
                            {file}
                          </Typography>
                          
                      
                            
                            <GetAppIcon 
                            onClick={handleDownload(`/uploads/${file}`)} 
                            style={{ marginLeft: 'auto' , marginRight: '0px' , height: '20px' , width : '20px' }}
                            fontSize='small'
                            />
                           
                          
                      </CardContent>

                      
                    <CardMedia
                          className={classes.media}
                          image={`/uploads/${file}`}
                          title="Image"
                          /> 
                  </Card>
            )
          }
        

        else{
          console.log( "file here");
          return(
          <Card className={classes.attach__file}>
                    <CardContent  style={{display: 'flex',  width:'100%' , height:'50px' , overflow:'hidden' }}>
                          <Typography gutterBottom variant="b5">
                            {file}
                          </Typography>
                          
                      
                            
                            <GetAppIcon 
                            onClick={handleDownload(`/uploads/${file}`)} 
                            style={{ marginLeft: 'auto' , height: '20px' , width : '20px' }}
                            fontSize='small'
                            />
                            
                          
                      </CardContent>

                   
                  </Card>
          )
        }
  })

  
  
  return (
    <Card className={classes.root}>
      <CardActions className={ classes.post__header}>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.user__name}>

            Posted By { props.createdby }
            
        </Typography>
        


      </CardActions>
      <CardActionArea className={classes.card__content} >
        
          <CardContent  >
            <Typography gutterBottom variant="h5" component="h2">
              { props.title }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.desc }
            </Typography>
          </CardContent>
        
        


        {/**
         * * This is the only way to access the upload 
         * * Don't try to navigate through directories to reach there
         */}
        <div className={classes.files__block}>
          {files_list}
        </div>
        

      </CardActionArea>
      
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
            {date}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
            {time}
        </Typography>

      </CardActions>




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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