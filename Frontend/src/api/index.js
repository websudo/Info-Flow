import axios from 'axios'


/**
 * * Creating an instance of axios with the baseURL
 */
const instance = axios.create( {
    baseURL : 'http://localhost:5000'
})

export default instance

