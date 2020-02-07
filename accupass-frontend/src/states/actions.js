import { SET_CATEGORIES, ADD_FAVORITE_ATTRACTION } from './actionTypes';

export const setCategories = allCategories => ({
  type: SET_CATEGORIES,
  payload: { allCategories },
});

export const addFavoriteAttraction = id => ({
  type: ADD_FAVORITE_ATTRACTION,
  payload: { id },
});
