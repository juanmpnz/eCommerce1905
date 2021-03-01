import  { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

// Combined reducer
import combinedReducer from './reducers'

export default createStore(
    combinedReducer,
    applyMiddleware(createLogger(), thunk)
)