import React, { useState, useEffect } from 'react';
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
  },
  media: {
    width: 300,
    height: 140,
  },
});

const AttractionCard = ({ attraction }) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(noImage);

  useEffect(() => {
    const img =
      attraction.images[Math.floor(Math.random() * attraction.images.length)];
    if (img) setCurrentImage(img.src);
  }, [attraction.images]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={currentImage} />
        <CardContent>
          <h2>{attraction.name}</h2>
          <p>{attraction.address}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

AttractionCard.propTypes = {
  attraction: PropTypes.object.isRequired,
};

export default AttractionCard;
