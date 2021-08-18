import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
                />  


                <Button variant="contained" color="primary">
                    Register
                </Button>
        </div>
    )
}
