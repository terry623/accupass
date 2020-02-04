import { SET_CATAGORIES, SET_ATTRACTIONS } from './actionTypes';

export const setCatagories = allCatagories => ({
  type: SET_CATAGORIES,
  payload: { allCatagories },
});

export const setAttractions = (catagory, specificAttractions) => ({
  type: SET_ATTRACTIONS,
  payload: { catagory, specificAttractions },
});
