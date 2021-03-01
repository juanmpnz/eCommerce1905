import { 
    SET_CATEGORIES,
    SELECT_CATEGORY,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    SHOW_LOADER,
    HIDE_LOADER

} from "../constants";

const initialState = {
  list: [],
  selectedCategory: {},
  loading:false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_CATEGORIES:
      newState.list = action.categories;
    break;
    case SELECT_CATEGORY:
      newState.selectedCategory = action.selectedCategory;
    break;
    case ADD_CATEGORY:
      newState.list = [... newState.list, action.category];
    break;
    case UPDATE_CATEGORY:
      newState.list[action.index].name = action.name
    break;
    case DELETE_CATEGORY:
      newState.list = newState.list.filter(c => c.id != action.id)
    break;
    case SHOW_LOADER:
      newState.loading = true;
    break;
    case HIDE_LOADER:
      newState.loading = false;
    break;
    default:
      return state;
  }
  return newState;
};
