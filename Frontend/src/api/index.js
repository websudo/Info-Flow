import axios from 'axios'


/**
 * * Creating an instance of axios with the baseURL
 */
const instance = axios.create( {
    baseURL : 'https://info-flow-backend.onrender.com',
    //baseURL : 'http://localhost:5000/'
})


/**
 * ! Interceptor called before every request 
 * * This adds the token in the header of the request before moving forward
 * * to the auth middleware for checking if the token is legit or not.
 */
instance.interceptors.request.use(( req ) => {
    if( localStorage.getItem( 'profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).data.token}`
    }
    
    return req;
})


export default instance

