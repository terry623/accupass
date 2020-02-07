import { ADD_FAVORITE_ATTRACTION } from '../actionTypes';

const initialState = {
  favoriteAttractions: [],
};

const attractions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_ATTRACTION: {
      const { id } = action.payload;
      return {
        ...state,
        favoriteAttractions: [...state.favoriteAttractions, id],
      };
    }
    default:
      return state;
  }
};

export default attractions;
