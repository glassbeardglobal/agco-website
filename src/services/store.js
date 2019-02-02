import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import itemReducer from './item/reducer';
import uiReducer from './UI/reducer';
import otherUsersReducer from './otherUsers/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  item: itemReducer,
  otherUsers: otherUsersReducer,
});

let middleware = applyMiddleware(thunk, logger);

const store = createStore(rootReducer, middleware);
export default store;
