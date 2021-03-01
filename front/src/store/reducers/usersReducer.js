import {
    SET_ME,
    SET_USERS,
    SELECT_USER,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
} from '../constants'

const initialState = {
    me: {},
    list: [],
    selectedUser: {},
}

export default (state = initialState, action) => {
    const newState = {... state}
    switch(action.type){
        case SET_ME:
            newState.me = action.me
        break
        case SET_USERS:
            newState.list = action.list
        break
        case ADD_USER:
            newState.list = [... newState.list, action.user]
        break
        case UPDATE_USER:
            newState.list[action.index] = action.user
        break
        case DELETE_USER:
            newState.list = newState.list.filter(u => u.id != action.id)
        break
        case SELECT_USER:
            newState.selectedUser = action.selectedUser
        break
        default:
            return state
    }
    return newState
} 