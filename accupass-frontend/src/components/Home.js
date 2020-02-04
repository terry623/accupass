import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getCategories, getAttractions } from '../api';
import Card from './Card';

import './Home.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentAttractions, setcurrentAttractions] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const {
        data: {
          data: { Category },
        },
      } = await getCategories();

      setCategory(Category);
      setCurrentCategoryIndex(0);
    }

    fetchCategory();
  }, []);

  useEffect(() => {
    if (currentCategoryIndex < 0) return;
    async function fetchAttractions() {
      const {
        data: { data },
      } = await getAttractions({
        categoryIds: category[currentCategoryIndex].id,
        page: currentPage,
      });
      setcurrentAttractions(data);
    }

    fetchAttractions();
  }, [currentCategoryIndex]);

  const handleChange = (event, newValue) => {
    setcurrentAttractions([]);
    setCurrentCategoryIndex(newValue);
  };

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
                {category.map(e => (
                  <Tab key={e.id} label={e.name} />
                ))}
              </Tabs>
            </AppBar>
            {category.map((e, i) => (
              <div key={e.id}>
                {currentCategoryIndex === i && (
                  <div className="attractions">
                    {currentAttractions.length > 0 ? (
                      <>
                        {currentAttractions.map(attraction => (
                          <Card key={attraction.id} attraction={attraction} />
                        ))}
                      </>
                    ) : (
                      <div className="progress">
                        <CircularProgress />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
