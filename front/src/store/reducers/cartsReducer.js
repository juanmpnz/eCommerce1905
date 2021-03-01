import {
    SET_MY_CART,
    ADD_ORDER,
    UPDATE_ORDER,
    REMOVE_ORDER,
    SET_CARTS,
    ADD_CART,
    SELECT_CART,
} from '../constants'

const initialState = {
    myCart: {},
    list: [],
    selectedCart: {}
}

export default (state = initialState, action) => {
    const newState = {... state}
    switch(action.type){
        case SET_MY_CART:
            newState.myCart = action.myCart
        break
        case ADD_ORDER:
            newState.myCart.orders = [
                ... newState.myCart.orders.filter(o => 
                    o.id != action.order.id),
                action.order]
        break
        case UPDATE_ORDER:
            newState.myCart.orders[action.index].units = action.units
        break
        case REMOVE_ORDER:
            newState.myCart.orders = newState.myCart.orders.filter(o => o.id != action.id)
        break
        case SET_CARTS:
            newState.list = action.list
        break
        case ADD_CART:
            newState.list = [... newState.list, action.cart]
        break
        case SELECT_CART:
            newState.selectedCart = action.selectedCart
        break
        default:
            return state
    }
    return newState
} 