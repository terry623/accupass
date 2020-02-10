import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import Attractions from './Attractions';
import Drawer from './Drawer';
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
  const [currentAttractions, setCurrentAttractions] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

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
      setCurrentAttractions(data);
    }

    fetchAttractions();
  }, [currentCategoryIndex]);

  const handleChange = (event, newValue) => {
    setCurrentAttractions([]);
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
                setCurrentAttractions={setCurrentAttractions}
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
      <Fab
        color="secondary"
        className="toggleDrawerButton"
        onClick={toggleDrawer(true)}
      >
        <FavoriteIcon />
      </Fab>
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
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
