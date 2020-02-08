import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

import AttractionCard from './AttractionCard';
import { getAttractions } from '../api';

const Attractions = ({
  currentAttractions,
  setcurrentAttractions,
  categoryId,
}) => {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadFunc = async () => {
    if (currentAttractions.length === 0) return;

    const nextPage = currentPage + 1;
    const remainAttractions = await getAttractions(categoryId, nextPage);
    setCurrentPage(nextPage);

    console.log({ remainAttractions });

    if (remainAttractions && remainAttractions.length === 0) setHasMore(false);
    else setcurrentAttractions([...currentAttractions, ...remainAttractions]);
  };

  return (
    <InfiniteScroll
      loadMore={loadFunc}
      hasMore={hasMore}
      loader={
        <div className="progress" key={0}>
          <CircularProgress />
        </div>
      }
    >
      <div className="attractions">
        {currentAttractions.map(attraction => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            categoryId={categoryId}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

Attractions.propTypes = {
  categoryId: PropTypes.number.isRequired,
  currentAttractions: PropTypes.array.isRequired,
  setcurrentAttractions: PropTypes.func.isRequired,
};

export default Attractions;
