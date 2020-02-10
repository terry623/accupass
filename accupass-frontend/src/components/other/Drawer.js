import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { connect } from 'react-redux';

import FavoriteActionIcon from './FavoriteActionIcon';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  title: {
    textAlign: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const TemporaryDrawer = ({
  isDrawerOpen,
  toggleDrawer,
  favoriteAttractions,
}) => {
  const classes = useStyles();

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <div className={classes.list}>
        <div className={classes.title}>
          <h3>喜歡的景點</h3>
        </div>
        <List>
          {favoriteAttractions.length > 0 ? (
            favoriteAttractions.map((item, index) => (
              <Link
                key={item.id}
                to={`/${item.id}?category=${item.categoryId}`}
                target="_blank"
                className="link"
              >
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar className={classes.small}>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.attraction.name} />
                  <ListItemSecondaryAction>
                    <FavoriteActionIcon
                      categoryId={item.categoryId}
                      attraction={item.attraction}
                      edge
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            ))
          ) : (
            <div className={classes.title}>還沒收藏任何景點😢</div>
          )}
        </List>
      </div>
    </Drawer>
  );
};

TemporaryDrawer.propTypes = {
  favoriteAttractions: PropTypes.array.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default connect(state => ({
  ...state.attractions,
}))(TemporaryDrawer);
