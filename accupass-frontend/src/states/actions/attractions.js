import {
  START_LOADING_ATTRACTIONS,
  END_LOADING_ATTRACTIONS,
  ADD_FAVORITE_ATTRACTION,
  REMOVE_FAVORITE_ATTRACTION,
} from '../actionTypes';
import { getAttractions as getAttractionsFromApi } from '../../api';

const startLoadingAttractions = () => ({
  type: START_LOADING_ATTRACTIONS,
});

const endLoadingAttractions = () => ({
  type: END_LOADING_ATTRACTIONS,
});

export const addFavoriteAttraction = ({ categoryId, attraction }) => ({
  type: ADD_FAVORITE_ATTRACTION,
  payload: { categoryId, attraction },
});

export const removeFavoriteAttraction = ({ attractionId }) => ({
  type: REMOVE_FAVORITE_ATTRACTION,
  payload: { attractionId },
});

export function getAttractions(categoryId) {
  return dispatch => {
    dispatch(startLoadingAttractions());

    return getAttractionsFromApi(categoryId)
      .then(attractions => {
        dispatch(endLoadingAttractions());
        return attractions;
      })
      .catch(err => {
        console.error('Error get attractions', err);
        dispatch(endLoadingAttractions());
      });
  };
}
