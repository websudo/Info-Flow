import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch  } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from '../../api/index'





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


  export default function Auth() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ loggedIn , setLoggedIn ] = useState({
        token : "",
        name : "",
        loggedin : false
    } )


    const [ values , setValues ] = useState({
        email : '',
        password : ''
    })

    const handleChange = (props) => (event) => {
        setValues({ ...values , [props] : event.target.value })
    }

    const handleSubmit = () => {
        if( values.email && values.password){
            axios.post('/api/auth/login' , values)
            .then( res => 
                {
                    if( res.status == 200){
                        setLoggedIn({
                            ...loggedIn , 
                            token : localStorage.setItem( 'token' , res.data.token ),
                            name : localStorage.setItem( 'user-name', res.data.user.name),
                            loggedin : true
                        }) 
                        

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
                onChange={handleChange('password')}
                />


                <Button 
                variant="contained" 
                color="primary"
                onClick={handleSubmit}
                >
                    LogIN
                </Button>
        </div>
    )
}
