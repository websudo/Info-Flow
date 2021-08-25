
const intialState = {
    user : null
}


/**
 * * authReducer handling the actions related to the User Authentication 
 */
const authReducer = ( state = intialState , action ) => {

    switch( action.type){

        case "AUTH": 
            console.log( "auth in authReducer ")

            /**
             * * Storing the token in the localStorage recieved from the payload
             */
            localStorage.setItem( 'token' , action.data.token)
            return { ...state , user : action.data };
            break;
        

        case "LOGOUT": 
            console.log( "logout in authReducer ")

            /**
             * * Clears the localStorage on Successfull Logout 
             */
            localStorage.clear()
            return state;
            break;


        default:
            return state;
            break;
    }
}

export default authReducer;