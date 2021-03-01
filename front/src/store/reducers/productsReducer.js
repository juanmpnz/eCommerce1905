import {
  SET_LIST,
  SELECT_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_IMAGE,
  DELETE_IMAGE,
  ADD_COMMENT,
  DELETE_COMMENT,
  SET_COMMENTS,
//rates & comments
  ADD_RATE,
} from "../constants";

const initialState = {
  list: [],
  selectedProduct: {},
  itsComments:[],
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_LIST:
      newState.list = action.products;
    break;
    case SELECT_PRODUCT:
      newState.selectedProduct = action.selectedProduct;

    break;
    case ADD_PRODUCT:
      newState.list = [action.product, ...newState.list];
    break;  
    case UPDATE_PRODUCT:
      newState.list = [action.product, ...newState.list.filter(p => p.id != action.product.id)]
    break;  
    case DELETE_PRODUCT:
      newState.list = newState.list.filter(p => p.id != action.id)
    break;  
    case ADD_IMAGE:
      newState.selectedProduct.images = newState.selectedProduct.images
      ? [...newState.selectedProduct.images, action.image]
      : []
    break;  
    case DELETE_IMAGE:
      newState.selectedProduct.images = newState.selectedProduct.images.filter(i => i.id != action.id)
    break;  
    case SET_COMMENTS:
        newState.itsComments = action.itsComments;
    break;
    case ADD_COMMENT:
      newState.itsComments = [action.comment, ... newState.itsComments]
      break;
    case DELETE_COMMENT:
      newState.itsComments = newState.itsComments.filter(c => c.id != action.id)
    break;
    case ADD_RATE:
      newState.selectedProduct.rates = [... newState.selectedProduct.rates, action.rate]
    break;
    default:
      return state;
  }
  return newState;
};
