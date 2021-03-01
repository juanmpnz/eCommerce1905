import { 
    SET_CATEGORIES,
    SELECT_CATEGORY,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    HIDE_LOADER,
    SHOW_LOADER
} from "../constants";
import axios from "axios";

// SET_CATEGORIES
const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories
})
export const fetchCategories = () => dispatch => {
    axios.get('/api/categories')
    .then(res => dispatch(setCategories(res.data)))
}

// SELECT_CATEGORY
const selectCategory = (selectedCategory) => ({
    type: SELECT_CATEGORY,
    selectedCategory
})
export const fetchCategory = (name) => dispatch => {
    axios.get(`/api/categories/${name}`)
    .then(res => dispatch(selectCategory(res.data)))
}

// ADD_CATEGORY
const addCategoryToMyList = (category) => ({
    type: ADD_CATEGORY,
    category
})
export const addCategory = (name) => dispatch => {
    axios.post(`/api/categories/`, {name})
    .then(res => dispatch(addCategoryToMyList(res.data)))
}

// UPDATE_CATEGORY
const updateCategoryInMyList = (index, name) => ({
    type: UPDATE_CATEGORY,
    index,
    name
})
export const updateCategory = (index, id, name) => dispatch => {
    axios.put(`/api/categories/${id}`, {name})
    .then(res => dispatch(updateCategoryInMyList(index, res.data.name)))
}

// DELETE_CATEGORY
const deleteCategoryFromMyList = (id) => ({
    type: DELETE_CATEGORY,
    id,
})
export const deleteCategory = (id) => dispatch => {
    axios.delete(`/api/categories/${id}`)
    .then(() => dispatch(deleteCategoryFromMyList(id)))
}
//LOADER CATEGORIES
export const showLoader = ()=> dispatch =>{
    dispatch({
        type: SHOW_LOADER
    })
}
export const hideLoader = ()=> dispatch =>{
    dispatch({
        type: HIDE_LOADER
    })
}