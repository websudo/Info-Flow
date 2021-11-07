import React,{ useState, useRef, useEffect} from 'react';
import {useStateWithCallbackLazy} from 'use-state-with-callback'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../api/index'
import FileBase from 'react-file-base64';
import axios_origin from 'axios';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * * Snackbar Imports 
 */
 import Snackbar from '@material-ui/core/Snackbar';
 import MuiAlert from '@material-ui/lab/Alert';

/**
   * * Alert Function 
   */
 function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    root: {
      maxWidth: '100%',
      marginTop : 20,
      ['@media (max-width: 420px)']:{
        marginLeft: 15,
        marginRight: 15,
      },
    },

    media: {
      height: 140,
    },

    close__icon__bar:{
        display: 'flex',
        justifyContent : 'flex-end',
        marginBottom : 0,
    },

    close__icon : {
    
        '&:hover': {
            background: '#a6a6a6',
        },
    },

    title__input:{
      marginTop:10,
      marginBottom:10,
      padding: 10,
      border : '1px black solid',
      borderRadius: 4,
      fontSize: 15,
    },

    description__input:{
      marginTop:10,
      padding: 10,
      border : '1px black solid',
      borderRadius: 4,
      fontSize: 15,
      height: 150,
    },

    label__input:{
      fontWeight: 'bold',
      fontSize : 17,
      marginTop: 0
    },

    post__button:{
      marginLeft: 'auto',
      marginRight: 10,
      marginBottom: 10,
      width: 70,
      textTransform: 'none'
    },

    file__upload:{
      cursor: 'pointer',
    },

    file__upload__icon:{
      marginTop: 10,
      width: 50,
      border: '2px solid black'
    }
  });


  export default function MediaCard({click_func , handleRefresh}) {
    const classes = useStyles();
    const isFirstRender = useRef(true);


    /** 
     * *STATE TO MANAGE THE DATA FROM CREATE POST  
     * */
    const [values, setValues] = React.useState({
        creator_id : JSON.parse(localStorage.getItem('profile')).data.user.id,
        createdby : JSON.parse(localStorage.getItem('profile')).data.user.name,
        title: '',
        description: '',
        upload: []
      });
    

    const [ file , setFile] = useState({
      files: '',
    })

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }

      setOpen(false);
  };

    const [ uploading , setUploading] = useState(false)

    useEffect(() => {
      
      if( isFirstRender.current){
        isFirstRender.current = false;
        return;
      }

      uploadFile();
    }, [file])

    /** 
     * ! This is how you should update a object in state,
     * * Property name is comming as a prop like ( title , description )
     * */
      const handleChange = (prop) => (event) => {
        
        setValues({ ...values, [prop]: event.target.value });
        
        if( prop == 'upload'){
          console.log(event.target.files)
          if( event.target.files.length <= 5){
            setFile( {files : event.target.files});
          }
          else{
            setOpen(true);
          }
          
        }
      };


      /** 
     * * SENDING DATA TO THE SERVER IF NEITHER OF THEM IS NULL
     * */
      const handleSubmit = (e) =>{
          e.preventDefault();

          if(file.files){
            
            const formData = new FormData();
            formData.append("creator_id",values.creator_id);
            formData.append("createdby",values.createdby);
            formData.append("title",values.title);
            formData.append("description",values.description);
            
            
            const n = values.upload.length;

            console.log(values);
            for( var i =0 ; i<n ; i++){
              formData.append("upload" , values.upload[i]);
            }
           
            console.log( formData.get("upload"));
          
            axios.post('/api/post', values, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            })
            .then( res => {
            
              console.log(res);
              click_func();
              handleRefresh();
            })
            .catch( err => {
              console.log(err)
            })
            
          }
          else{
            const formData = new FormData();
            formData.append("creator_id",values.creator_id);
            formData.append("createdby",values.createdby);
            formData.append("title",values.title);
            formData.append("description",values.description);

            
            axios.post('/api/post', values)
            .then( res => {
            
              console.log(res);
              click_func();
              handleRefresh();
            })
            .catch( err => {
              console.log(err)
            })
          }

      }


      const uploadFile = () => {

        setUploading(true);

        var file_arr = [];

          console.log(file.files);

          const uploaders = Array.prototype.map.call(file.files , async file => {

          const data = new FormData();  
        
          data.append("upload_preset","info-flow");
          data.append("cloud_name", "dguetook9");
          data.append("resource_type", "raw")
          data.append("file", file);


          return axios_origin.post("https://api.cloudinary.com/v1_1/dguetook9/image/upload", data, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
              const data = response.data;
              const fileURL = data.secure_url;
              file_arr.push(fileURL);
              
              console.log(fileURL);
            })

        });

        axios_origin.all(uploaders).then(() => {
          // ... perform after upload is successful operation
          console.log(file_arr);
          setValues({
            ...values ,  upload : file_arr 
          });

          setUploading(false);

          console.log(values)
        });
        
      }

      
 
  return (
        <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <CloseIcon  onClick={() => click_func()} className={classes.close__icon}/>
        </CardActions>
        

        {/**
         * ! Remember to use encType while using formData 
         */}
        <form onSubmit={handleSubmit} encType='application/x-www-form-urlencoded' > 

        <CardContent>


        <FormControl fullWidth className={classes.margin}>

        <label htmlFor='title' className={classes.label__input}>Title</label>
        <input className={classes.title__input} id="title" onChange={handleChange('title')} placeholder="Title of Post" required ></input>  
        </FormControl>
        


        <FormControl fullWidth className={classes.margin}>
       
        <label htmlFor='desc' className={classes.label__input}>Description</label>
        <textarea className={classes.description__input} id="desc" onChange={handleChange('description')} placeholder="Description of Post"  required></textarea> 


        
        <Grid item>
            <Tooltip title="Upload" arrow placement="right">
              <label htmlFor='file__input' className={classes.file__upload}><UploadFileIcon className={classes.file__upload__icon}/></label>
            </Tooltip>
        </Grid>
        <input type='file' id='file__input' filename="upload" accept=".png,.jpg,.jpeg,.pdf,.doc,.ppt,.xlsx,.txt" style={{ display: 'none'}} onChange={handleChange('upload')} multiple></input>
        

         

        {/*<FileBase 
          type = 'file'
          multiple = {false}
          onDone = { ({base64}) => setValues({ ...values ,upload : base64}) }
        />
        */}

        </FormControl>

        

        </CardContent>
  
        <CardActions>
        <Button 
            size="small" 
            color="primary"
            variant="contained"
            type="submit"
            className={classes.post__button}
            disableElevation
            disabled={uploading}
            >
            Post
        </Button>
        </CardActions>

        </form>

        { uploading &&
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        }

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                      Maximum file upload limit is 5! Please try again.
                    </Alert>
            </Snackbar>
        
    </Card>
  );
}