import { combineReducers } from 'redux'
import authReducer from './reducers/auth'


/**
 * * Combining all the individual reducers in a single rootReducer 
 * * As Redux only allows a single reducer 
 */
const rootReducer = combineReducers( { authReducer });

export default rootReducer;
