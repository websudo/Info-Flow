import React, { useState , useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from '../../api/index'

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

    const [ values , setValues ] = useState({
        name : "",
        email : "",
        password: "",
        password_confirmation: ""
    })

    const handleChange = (props) => (event) => {
        setValues({ ...values, [props] : event.target.value})
    }


    const handleRegister= () => {
        if( values.name && values.email && values.password && values.password_confirmation){
            axios.post( '/api/auth/register' , values )
            .then( res => {

                /**
                 * * Refreshes the authentication page if the signup is successfull
                 */
                if( res.status == 200){
                    window.location.reload(false);
                }
                console.log(res)
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

            <TextField
                required
                className={classes.input__field}
                id="outlined-required"
                label="Password"
                placeholder="Enter Password"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={ handleChange('password') }
                />

            <TextField
                required
                className={classes.input__field}
                id="outlined-required"
                label="Confirm Password"
                placeholder="Enter Password Again"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={ handleChange('password_confirmation') }
                />  


                <Button 
                variant="contained" 
                color="primary"
                onClick={handleRegister}
                >
                    Register
                </Button>
        </div>
    )
}
