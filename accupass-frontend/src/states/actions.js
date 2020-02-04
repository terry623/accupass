import { SET_CATEGORIES, SET_ATTRACTIONS } from './actionTypes';

export const setCategories = allCategories => ({
  type: SET_CATEGORIES,
  payload: { allCategories },
});

export const setAttractions = (categories, specificAttractions) => ({
  type: SET_ATTRACTIONS,
  payload: { categories, specificAttractions },
});
