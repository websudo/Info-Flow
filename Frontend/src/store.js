import { createStore } from 'redux'
import rootReducer from './rootReducer';

const defaultState = {}

const store = createStore( rootReducer , defaultState )

export default store;