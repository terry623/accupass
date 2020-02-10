import {
  START_LOADING_ATTRACTIONS,
  END_LOADING_ATTRACTIONS,
  ADD_FAVORITE_ATTRACTION,
  REMOVE_FAVORITE_ATTRACTION,
} from '../actionTypes';

const initialState = {
  favoriteAttractions: [],
  attractionsLoading: false,
};

const attractions = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_ATTRACTIONS:
      return {
        ...state,
        attractionsLoading: true,
      };
    case END_LOADING_ATTRACTIONS:
      return {
        ...state,
        attractionsLoading: false,
      };
    case ADD_FAVORITE_ATTRACTION: {
      const { categoryId, attraction } = action.payload;
      return {
        ...state,
        favoriteAttractions: [
          ...state.favoriteAttractions,
          { id: attraction.id, attraction, categoryId },
        ],
      };
    }
    case REMOVE_FAVORITE_ATTRACTION: {
      const { attractionId } = action.payload;
      return {
        ...state,
        favoriteAttractions: [
          ...state.favoriteAttractions.filter(
            attraction => attraction.id !== attractionId
          ),
        ],
      };
    }
    default:
      return state;
  }
};

export default attractions;
