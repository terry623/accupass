import { SET_ATTRACTIONS } from '../actionTypes';

const initialState = {
  allAttractions: {},
};

const attractions = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATTRACTIONS: {
      const { categories, specificAttractions } = action.payload;
      return {
        ...state,
        allAttractions: {
          ...state.allAttractions,
          [categories]: specificAttractions,
        },
      };
    }
    default:
      return state;
  }
};

export default attractions;
