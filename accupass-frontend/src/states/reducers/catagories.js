import { SET_CATAGORIES } from '../actionTypes';

const initialState = {
  allCatagories: [],
};

const catagories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATAGORIES: {
      const { allCatagories } = action.payload;
      return {
        ...state,
        allCatagories,
      };
    }
    default:
      return state;
  }
};

export default catagories;
