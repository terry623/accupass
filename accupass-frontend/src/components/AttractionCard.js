import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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

const AttractionCard = ({ attraction, category }) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(noImage);

  useEffect(() => {
    const img = attraction.images[0];
    if (img) setCurrentImage(img.src);
  }, [attraction.images]);

  return (
    <Link
      to={`/${attraction.id}?category=${category}`}
      target="_blank"
      className="link"
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={currentImage} />
          <CardContent>
            <h2>{attraction.name}</h2>
            <p>{attraction.address}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

AttractionCard.propTypes = {
  attraction: PropTypes.object.isRequired,
  category: PropTypes.number.isRequired,
};

export default AttractionCard;
