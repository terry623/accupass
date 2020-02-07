import {
  START_LOADING_CATEGORIES,
  END_LOADING_CATEGORIES,
  SET_CATEGORIES,
} from '../actionTypes';

const initialState = {
  allCategories: [],
  categoriesLoading: false,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_CATEGORIES:
      return {
        ...state,
        categoriesLoading: true,
      };
    case END_LOADING_CATEGORIES:
      return {
        ...state,
        categoriesLoading: false,
      };
    case SET_CATEGORIES: {
      const { allCategories } = action.payload;
      return {
        ...state,
        allCategories,
      };
    }
    default:
      return state;
  }
};

export default categories;
