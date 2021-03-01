import { combineReducers } from 'redux'
import cartsReducer from './cartsReducer'
import productsReducer from './productsReducer'
import usersReducer from './usersReducer'
import categoriesReducer from './categoriesReducer'

export default combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    carts: cartsReducer,
})