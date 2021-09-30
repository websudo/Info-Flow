import React, { useState , useEffect } from 'react'
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from '../../api/index'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Loading from '../loading/Loading';

const useStyles = makeStyles((theme) => ({
    
    signup__main:{
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


  export default function Auth() {

    const classes = useStyles();
    const history = useHistory();

    const [ loading , setLoading ] = useState(false);
    const [ values , setValues ] = useState({
        name : "",
        email : "",
        password: "",
        password_confirmation: "",
        showPassword : false
    })

    const handleChange = (props) => (event) => {
        setValues({ ...values, [props] : event.target.value})
    }


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    const handleRegister= () => {

        setLoading(true);
        if( values.name && values.email && values.password && values.password_confirmation){
            axios.post( '/api/auth/register' , values )
            .then( res => {
                console.log(res)

                /**
                 * * Force Reloading the page after Sign Up 
                 * * So that the Sign in page is promted 
                 */
                setLoading(false);
                history.push('/auth');
            })
        }

        else{
            console.log( " Parameters missing ")
        }
    }
    
    return (
        <div className={classes.signup__main}>

            <TextField
                required
                className={classes.input__field}
                id="outlined-required"
                label="Full Name"
                placeholder="Enter Full Name"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                  }}

                onChange={handleChange('name') }
                />


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
                onChange={ handleChange('email') }
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

                <FormControl className={clsx(classes.margin, classes.textField , classes.input__field)} variant="outlined">
                <InputLabel htmlFor="standard-adornment-password-confirmation">Confirm Password</InputLabel>
                        <OutlinedInput
                    id="outlined-adornment-password-confirmation"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password_confirmation}
                    onChange={handleChange('password_confirmation')}
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
                onClick={handleRegister}
                >
                    Register
                </Button>

                <Loading active={loading}/>
        </div>
    )
}
