import { SET_CATEGORIES } from '../actionTypes';

const initialState = {
  allCategories: [],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
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
