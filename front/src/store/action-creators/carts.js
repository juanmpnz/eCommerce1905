import {
    SET_MY_CART,
    ADD_ORDER,
    UPDATE_ORDER,
    REMOVE_ORDER,
    SET_CARTS,
    ADD_CART,
    SELECT_CART,
} from '../constants'

import axios from 'axios'

// SET_MY_CART
export const setMyCart = (myCart) => ({
    type: SET_MY_CART,
    myCart,
})
export const fetchMyCart = () => dispatch => {
    return axios.get('/api/carts/current')
    .then(res => dispatch(setMyCart(res.data)))
}

// ADD_ORDER
const addOrderToMyCart = (order) => ({
    type: ADD_ORDER,
    order
})
export const addOrder = (cartId, productId, units) => dispatch => {
   return  axios.post('/api/carts/orders', {cartId, productId, units})
    .then(res => dispatch(addOrderToMyCart(res.data)))
}

// UPDATE_ORDER
const updateOrderinMyCart = (index, units) => ({
    type: UPDATE_ORDER,
    index,
    units,
})
export const updateOrder = (index, orderId, units) => dispatch => {
    axios.put(`/api/carts/orders/${orderId}`, {units})
    .then(res => dispatch(updateOrderinMyCart(index, res.data.units)))
}

// REMOVE_ORDER
const removeOrderFromMyCart = (id) => ({
    type: REMOVE_ORDER,
    id
})
export const removeOrder = (id) => dispatch => {
    axios.delete(`/api/carts/orders/${id}`)
    .then(() => dispatch(removeOrderFromMyCart(id)))
}

// SET_CARTS que se borre cuando se deslogea
export const setCarts = (list) => ({
    type: SET_CARTS,
    list,
})
export const fetchCarts = () => dispatch => {
    return axios.get('/api/carts/')
    .then(res => dispatch(setCarts(res.data)))
}

// ADD_CART
export const addCartToMyList = (cart) => ({
    type: ADD_CART,
    cart,
})

// SELECT_CART
const selectCart = (selectedCart) => ({
    type: SELECT_CART,
    selectedCart,
})
export const fetchSelectedCart = id => dispatch => {
    axios.get(`/api/carts/${id}`)
    .then(res => dispatch(selectCart(res.data)))
}