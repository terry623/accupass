import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import noImage from '../assets/noImage.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 'auto',
  },
  media: {
    width: 300,
    height: 140,
  },
});

const AttractionCard = ({ attraction, categoryId }) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(noImage);

  useEffect(() => {
    const img = attraction.images[0];
    if (img) setCurrentImage(img.src);
  }, [attraction.images]);

  return (
    <Card className={classes.root}>
      <Link
        to={`/${attraction.id}?category=${categoryId}`}
        target="_blank"
        className="link"
      >
        <CardActionArea>
          <CardMedia className={classes.media} image={currentImage} />
          <CardContent>
            <h2>{attraction.name}</h2>
            <p>{attraction.address}</p>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={() => console.log('add to favorites')}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => console.log('copy the url')}
        >
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

AttractionCard.propTypes = {
  attraction: PropTypes.object.isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default AttractionCard;
