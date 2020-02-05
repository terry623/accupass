import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import { getCategories, getAttractions } from '../api';
import AttractionCard from './AttractionCard';
import { setCategories, setAttractions } from '../states/actions';

import './Home.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = ({
  allCategories,
  setCategories: setCategoriesFromProps,
  allAttractions,
  setAttractions: setAttractionsFromProps,
}) => {
  const classes = useStyles();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
  const [currentAttractions, setcurrentAttractions] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      if (allCategories.length === 0) {
        const data = await getCategories();
        setCategoriesFromProps(data);
      }
      setCurrentCategoryIndex(0);
    }

    fetchCategory();
  }, []);

  useEffect(() => {
    if (currentCategoryIndex < 0) return;
    async function fetchAttractions() {
      const { id } = allCategories[currentCategoryIndex];
      const attractions = allAttractions[id];

      if (!attractions) {
        const data = await getAttractions(id);
        setAttractionsFromProps(id, data);
        setcurrentAttractions(data);
      } else {
        setcurrentAttractions(attractions);
      }
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
            {currentAttractions.length > 0 ? (
              <div className="attractions">
                {currentAttractions.map(attraction => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    category={allCategories[currentCategoryIndex].id}
                  />
                ))}
              </div>
            ) : (
              <div className="progress">
                <CircularProgress />
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    ));

  return (
    <div className="Home">
      <div className={classes.root}>
        {currentCategoryIndex < 0 ? (
          <div className="loading">
            <h2>Loading ......</h2>
          </div>
        ) : (
          <Fragment>
            <AppBar position="static" color="default">
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
            </AppBar>
            {displayAttractions()}
          </Fragment>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  allAttractions: PropTypes.object.isRequired,
  allCategories: PropTypes.array.isRequired,
  setAttractions: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    ...state.categories,
    ...state.attractions,
  }),
  { setCategories, setAttractions }
)(Home);
