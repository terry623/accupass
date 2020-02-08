import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import Attractions from './Attractions';
import { getAttractions } from '../states/actions/attractions';
import { getCategories } from '../states/actions/categories';

import './Home.scss';

const Home = ({
  categoriesLoading,
  attractionsLoading,
  allCategories,
  getCategories: getCategoriesFromProps,
  getAttractions: getAttractionsFromProps,
}) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
  const [currentAttractions, setcurrentAttractions] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      await getCategoriesFromProps();
      setCurrentCategoryIndex(0);
    }

    fetchCategory();
  }, []);

  useEffect(() => {
    if (currentCategoryIndex < 0) return;
    async function fetchAttractions() {
      const { id: categoryId } = allCategories[currentCategoryIndex];
      const data = await getAttractionsFromProps(categoryId);
      setcurrentAttractions(data);
    }

    fetchAttractions();
  }, [currentCategoryIndex]);

  const handleChange = (event, newValue) => {
    setcurrentAttractions([]);
    setCurrentCategoryIndex(newValue);
  };

  const displayAttractions = () =>
    allCategories.map((e, i) => (
      <Fragment key={e.id}>
        {currentCategoryIndex === i && (
          <Fragment>
            {attractionsLoading ? (
              <div className="progress">
                <CircularProgress />
              </div>
            ) : (
              <Attractions
                currentAttractions={currentAttractions}
                setcurrentAttractions={setcurrentAttractions}
                categoryId={allCategories[currentCategoryIndex].id}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    ));

  return (
    <div className="Home">
      {categoriesLoading ? (
        <div className="loading">
          <h2>Loading ......</h2>
        </div>
      ) : (
        <Fragment>
          <AppBar color="default">
            {currentCategoryIndex > -1 && (
              <Tabs
                value={currentCategoryIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                {allCategories.map(e => (
                  <Tab key={e.id} label={e.name} />
                ))}
              </Tabs>
            )}
          </AppBar>
          {displayAttractions()}
        </Fragment>
      )}
    </div>
  );
};

Home.propTypes = {
  allCategories: PropTypes.array.isRequired,
  attractionsLoading: PropTypes.bool.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
  getAttractions: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    ...state.attractions,
    ...state.categories,
  }),
  { getCategories, getAttractions }
)(Home);
