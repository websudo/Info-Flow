import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch  } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from '../../api/index'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/**
 * * Snackbar Imports 
 */
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
    
    signin__main:{
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
    },

    input__field: {
        marginTop: 10,
        marginBottom: 10
    }
    
  }));



  /**
   * * Alert Function 
   */
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  export default function Auth() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ loggedIn , setLoggedIn ] = useState({} )


    const [ values , setValues ] = useState({
        email : '',
        password : '',
        showPassword: false,
    })

    const [open, setOpen] = React.useState(false);


    const handleClick = () => {
        setOpen(true);
        console.log( "Snackbar")
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    const handleChange = (props) => (event) => {
        setValues({ ...values , [props] : event.target.value })
    }


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      

    const handleSubmit = () => {
        if( values.email && values.password){
            axios.post('/api/auth/login' , values)
            .then( res => 
                {
                    if( res.status == 200){

                        /**
                         * * Dispatching AUTH action 
                         */
                        dispatch({  type : 'AUTH' , data : {res} })

                        /**
                         * * Redirecting back to the Homepage after Successfull Login
                         */
                        history.push( '/' )
                        
                        
                    }
                    console.log(res)
                }
            )
            .catch(err => {
                console.log( "Wrong Credentials ");
                handleClick()
            })
        }
    }

    return (
        <div className={classes.signin__main}>

            <TextField
                required
                className={classes.input__field}
                id="outlined-required"
                label="Email"
                placeholder="Enter Email Address"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={handleChange('email')}
                />

                <FormControl className={clsx(classes.margin, classes.textField , classes.input__field)} variant="outlined">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
                        </FormControl>
                <Button 
                variant="contained" 
                color="primary"
                onClick={handleSubmit}
                >
                    LogIN
                </Button>


                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Wrong Credentials
                    </Alert>
                </Snackbar>

        </div>
    )
}
