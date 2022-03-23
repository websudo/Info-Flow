import React,{ useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../../api/index'
import {io} from 'socket.io-client'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import "./Poll.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';





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
        width:"500px",
        maxWidth: '800px',
        minHeight: '300px',
  
    
        zIndex: '20000',

        ['@media (max-width: 420px)']:{
            marginLeft: 15,
            marginRight: 15,
        },
    },

    close__icon__bar:{
        display: 'flex',
        justifyContent : 'flex-end',
        marginBottom : 0,
        backgroundColor: 'rgba(63,81,181)',
    },

    card__content:{
        backgroundColor: 'rgba(63,81,181)',
    },

    close__icon : {
        
        color: 'white',
        '&:hover': {
            background: '#666666',
        },

        cursor: 'pointer',
    },

    post__button:{
        marginLeft: 'auto',
        marginRight: 10,
        marginBottom: 10,
        width: 70,
        textTransform: 'none'
      },

    divider:{
        backgroundColor: 'white',
    }
  });

export default function Poll({creator_id, id, title, description, options, submitted_by, not_submitted, total_vote, handlePollCloseIconClick, handlePollCloseByUser}) {

    console.log(submitted_by)
    const classes = useStyles();
 
    const [open, setOpen] = useState(false);
    const openSnack = useRef(false);
    const [value, setValue] = useState();
    const [labels, setLabels] = useState();
    const [data, setData] = useState();
    const [refreshPoll, setRefreshPoll] = useState(false);
    const [postDisable, setPostDisable] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const userId = JSON.parse(localStorage.getItem('profile'))?.data.user.id

    const socket = useRef();

    useEffect( () =>{
      socket.current = io("https://infofloww.herokuapp.com/");
      setShowPoll(JSON.parse(localStorage.getItem('profile'))?.data.user.admin);
    },[])

    useEffect(() =>{
        const labels = [];
        const data = [];
        options.forEach( o =>{
            labels.push(o.option);
            data.push(o.count);
        })

        setLabels(labels);
        setData(data);
        console.log(labels);
    },[])

    useEffect(() =>{
        socket.current.on("recieveUpdatedPoll",({data}) =>{
            setData(data);
        })

        socket.current.on("closePoll", () =>{
            handlePollCloseIconClick();
        })
    })

    useEffect( () =>[

    ],[data])


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = (event) =>{
        console.log( event.target.id)
        setValue(event.target.id);
    }
    
    const handleClosePollForAll = () =>{
        socket.current.emit("closePollForAll");

        try{
          console.log(id)
          const res = axios.post('/api/poll/closepoll', {id: id});
          res.then( (response) => console.log(response.data),
          (err) => console.log(err)
          )
        }
        catch(err){
          console.log(err);
        }
        
    }


    const handleSubmit = (e) =>{

        e.preventDefault();

        const new_data = data;

        new_data[value] = new_data[value] + 1;
        setData(new_data) ;
        setShowPoll(true);
        setRefreshPoll(!refreshPoll);
        setPostDisable(true);

        socket.current.emit("updatedPoll",{data});

        if( value ){
            console.log( value );
        }


        submitted_by.push(userId);
        options[value].count = options[value].count + 1;
        total_vote = total_vote + 1;
        console.log(options);

        console.log(submitted_by, data);
        try{
          console.log(userId)
          const res = axios.post('/api/poll/add-user-submitted', {submitted_by: submitted_by, id: id, options: options, total_vote: total_vote});
          res.then( (response) => console.log(response.data),
          (err) => console.log(err)
          )
          }
          catch(err){
          console.log(err);
          }
    }

    console.log(userId, creator_id);
    
  return (
    <Card className={classes.root}>

        <CardActions className={classes.close__icon__bar}>
            <CloseIcon  onClick={() => {handleClickOpen()}} className={classes.close__icon}/>
        </CardActions>
        

        {/**
         * ! Remember to use encType while using formData 
         */}

        { JSON.parse(localStorage.getItem("profile")).data.user.id !== creator_id && 

        <form onSubmit={handleSubmit} encType='application/x-www-form-urlencoded' > 

        <CardContent className={classes.card__content}>
        
        <h1 className='poll__title'>{title}</h1>
        <p className='poll__desc'>{description}</p>

        <Divider variant="middle" className={classes.divider}/>

        <FormControl>
        <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleChange}
            >
        {options.map((x, i) => {
            console.log(i);
        return (
            <FormControlLabel value={x.option} id={i} control={<Radio id={i} color="default" />} label={x.option} className="poll__options" />
        );
      })}
        </RadioGroup>

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
            disabled={postDisable}
            >
            Submit
        </Button>
        </CardActions>

        </form>

        }

        { JSON.parse(localStorage.getItem("profile")).data.user.id === creator_id && 
          <CardContent className={classes.card__content}>
        
          <h1 className='poll__title'>{title}</h1>
          <p className='poll__desc'>{description}</p>
  
          <Divider variant="middle" className={classes.divider}/>

          <ol>
            {options.map((x, i) => {
                console.log(i);
            return (
                <li className='poll__options'>{x.option}</li>
            );
            })}
          </ol>
          </CardContent>
        }

        {showPoll && 
        <CardContent>
        <Bar
            data={{
                // Name of the variables on x-axies for each bar
                labels: labels,
                datasets: [
                  {
                    // Label for bars
                    label: "total value",
                    // Data or value of your each variable
                    data: data,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgb(54, 162, 235)'],
                    borderWidth: 1,
                  },
                ],
               
              }}
              // Height of graph
              height={400}
              width={400}
              options={{
                maintainAspectRatio: false,
              }}
        />
        </CardContent>
        }

        {/* { uploading &&
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
        } */}

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

          { JSON.parse(localStorage.getItem("profile")).data.user.id === creator_id && 
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to close this poll! This action will close poll for every participant.
          </DialogContentText>}

          { JSON.parse(localStorage.getItem("profile")).data.user.id !== creator_id && 
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to close this poll! After closing you can't access the poll again, make sure to vote before closing.
          </DialogContentText>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { JSON.parse(localStorage.getItem('profile'))?.data.user.id === creator_id?handleClosePollForAll():handlePollCloseByUser(id, userId)}} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


      {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog> */}

            {/* <Snackbar open={openSnack.current} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="warning">
                        Poll was closed by the creator.
                    </Alert>
            </Snackbar> */}
        
    </Card>
  );
}
