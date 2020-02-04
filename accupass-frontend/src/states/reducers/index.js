import { combineReducers } from 'redux';
import catagories from './catagories';
import attractions from './attractions';

export default combineReducers({
  catagories,
  attractions,
});
