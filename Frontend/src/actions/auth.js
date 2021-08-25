

/**
 * * authAction Triggers on successfull Login 
 */

export const authAction = (data) => {
    return {
        type : " AUTH ",
        data
    }
}


/**
 * * logoutAction Triggers on Logout 
 */

export const logoutAction = () => {
    return {
        type : "LOGOUT "
    }
}