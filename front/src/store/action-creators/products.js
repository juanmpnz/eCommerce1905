import {
  SET_LIST,
  SELECT_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_IMAGE,
  DELETE_IMAGE,
  SET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_RATE
} from "../constants";
import axios from "axios";

// SET_LIST
const setList = (products) => ({
  type: SET_LIST,
  products,
});
export const fetchProducts = () => (dispatch) => {
  axios.get("/api/products")
  .then((res) => dispatch(setList(res.data)))
};

// SELECT_PRODUCT
const setSelectedProduct = (selectedProduct) => ({
  type: SELECT_PRODUCT,
  selectedProduct,
});

export const fetchSelectedProduct = id => dispatch => {
  return axios.get(`/api/products/${id}`)
  .then(res => dispatch(setSelectedProduct(res.data)));
};

// ADD_PRODUCT
const addProductToMyList = product => ({
  type: ADD_PRODUCT,
  product
})
export const addProduct = product => dispatch => {
  return axios.post('/api/products', product)
  .then(res => dispatch(addProductToMyList(res.data)))
}

// UPDATE_PRODUCT
const updateProductInMyList = product => ({
  type: UPDATE_PRODUCT,
  product
})
export const updateProduct = (id, data) => dispatch => { 
  axios.put(`/api/products/${id}`, data)
  .then(res => dispatch(updateProductInMyList(res.data)))
}

// DELETE_PRODUCT
const deleteProductFromMyList = id => ({
  type: DELETE_PRODUCT,
  id
})
export const deleteProduct = id => dispatch => {
  return axios.delete(`/api/products/${id}`)
  .then(() => dispatch(deleteProductFromMyList(id)))
}

/* IMAGES */
// ADD_IMAGE
const addImageToSelectedProduct = image => ({
  type: ADD_IMAGE,
  image,
})
export const addImage = (productId, url) => dispatch => {
  return axios.post(`/api/products/${productId}/images`, {url})
  .then(res => dispatch(addImageToSelectedProduct(res.data)))
}
// DELETE_IMAGE
const deleteImageFromSelectedProduct = id => ({
  type: DELETE_IMAGE,
  id,
})
export const deleteImage = (id) => dispatch => {
  return axios.delete(`/api/products/images/${id}`)
  .then(() => dispatch(deleteImageFromSelectedProduct(id)))
}

/* COMMENTS */
// SET_COMMENTS
const setItsComments = itsComments => ({
    type: SET_COMMENTS,
    itsComments
})
export const fetchItsComments = productId => dispatch => {
  return axios.get(`/api/products/${productId}/comments`)
  .then(res => dispatch(setItsComments(res.data)))
}
// ADD_COMMENT
const addCommentToMyProduct = comment => ({
  type: ADD_COMMENT,
  comment
})
export const addComment = (productId, content)=> dispatch => {
  console.log('EL PRODU ID: ', productId)
  console.log('EL COMMEN: ', {content})
  return axios.post(`/api/products/${productId}/comments`, {content})
  .then(res => {
    console.log('ACA ESTA LA DATA: ', res.data)
    dispatch(addCommentToMyProduct(res.data))
  })
}

/////////////////////// COMMENTS & RATES
const addRate = rate =>{
  return{
    type: ADD_RATE,
    rate
  }
}
export const createRating = (id, content) => dispatch => {
  axios.post(`/api/products/${id}/rates`, {content})
  .then(res=>dispatch(addRate(res.data)))
}

export const deleteCommentFromMyList = id => ({
    type : DELETE_COMMENT,
    id
})

export const deleteComment = id=> dispatch => {
  axios.delete(`/api/products/comments/${id}`)
  .then(()=> dispatch(deleteCommentFromMyList(id)))
}

