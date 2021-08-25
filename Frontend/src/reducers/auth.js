
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
             * * Storing the response in the localStorage
             * * Now to store it first convert it into String 
             */
            localStorage.setItem( 'profile' , JSON.stringify(action.data.res) )
            console.log( action.data.res)
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