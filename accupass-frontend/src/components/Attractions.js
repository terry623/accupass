import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import LazyLoad from 'react-lazyload';
import ClipboardJS from 'clipboard';
import CircularProgress from '@material-ui/core/CircularProgress';

import AttractionCard from './AttractionCard';
import { getAttractions } from '../api';

const Attractions = ({
  currentAttractions,
  setCurrentAttractions,
  categoryId,
}) => {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const clipboard = new ClipboardJS('.shareButton');

    clipboard.on('success', e => {
      alert(`已複製網址 : ${e.text}\n快分享給朋友吧😀`);
      e.clearSelection();
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const loadFunc = async () => {
    if (currentAttractions.length === 0) return;

    const nextPage = currentPage + 1;
    const remainAttractions = await getAttractions(categoryId, nextPage);
    setCurrentPage(nextPage);

    if (remainAttractions && remainAttractions.length === 0) setHasMore(false);
    else setCurrentAttractions([...currentAttractions, ...remainAttractions]);
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
          <LazyLoad key={attraction.id} height={300}>
            <AttractionCard attraction={attraction} categoryId={categoryId} />
          </LazyLoad>
        ))}
      </div>
    </InfiniteScroll>
  );
};

Attractions.propTypes = {
  categoryId: PropTypes.number.isRequired,
  currentAttractions: PropTypes.array.isRequired,
  setCurrentAttractions: PropTypes.func.isRequired,
};

export default Attractions;
