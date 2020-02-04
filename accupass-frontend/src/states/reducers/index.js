import { combineReducers } from 'redux';
import categories from './categories';
import attractions from './attractions';

export default combineReducers({
  categories,
  attractions,
});
