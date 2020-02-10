import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';

import {
  addFavoriteAttraction,
  removeFavoriteAttraction,
} from '../../states/actions/attractions';

const FavoriteActionIcon = ({
  categoryId,
  attraction,
  edge,
  favoriteAttractions,
  addFavoriteAttraction: addFavoriteAttractionFromProps,
  removeFavoriteAttraction: removeFavoriteAttractionFromProps,
}) => {
  const [inFavorites, setInFavorites] = useState(false);

  const favoriteAction = e => {
    e.preventDefault();
    if (!inFavorites) {
      addFavoriteAttractionFromProps({
        categoryId,
        attraction,
      });
    } else {
      removeFavoriteAttractionFromProps({
        attractionId: attraction.id,
      });
    }
  };

  useEffect(() => {
    const result = favoriteAttractions.find(e => e.id === attraction.id);
    if (result) setInFavorites(true);
    else setInFavorites(false);
  }, [favoriteAttractions]);

  return (
    <IconButton
      color={inFavorites ? 'secondary' : 'default'}
      onClick={favoriteAction}
      edge={edge ? 'end' : false}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

FavoriteActionIcon.propTypes = {
  addFavoriteAttraction: PropTypes.func.isRequired,
  attraction: PropTypes.object.isRequired,
  categoryId: PropTypes.number.isRequired,
  edge: PropTypes.bool,
  favoriteAttractions: PropTypes.array.isRequired,
  removeFavoriteAttraction: PropTypes.func.isRequired,
};

FavoriteActionIcon.defaultProps = {
  edge: false,
};

export default connect(
  state => ({
    ...state.attractions,
  }),
  { addFavoriteAttraction, removeFavoriteAttraction }
)(FavoriteActionIcon);
