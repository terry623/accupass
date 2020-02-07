import {
  START_LOADING_CATEGORIES,
  END_LOADING_CATEGORIES,
  SET_CATEGORIES,
} from '../actionTypes';
import { getCategories as getCategoriesFromApi } from '../../api';

const startLoadingCategories = () => ({
  type: START_LOADING_CATEGORIES,
});

const endLoadingCategories = () => ({
  type: END_LOADING_CATEGORIES,
});

const setCategories = allCategories => ({
  type: SET_CATEGORIES,
  payload: { allCategories },
});

export function getCategories() {
  return dispatch => {
    dispatch(startLoadingCategories());

    return getCategoriesFromApi()
      .then(allCategories => {
        dispatch(setCategories(allCategories));
        dispatch(endLoadingCategories());
      })
      .catch(err => {
        console.error('Error get categories', err);
        dispatch(endLoadingCategories());
      });
  };
}
