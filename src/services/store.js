import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import uiReducer from './UI/reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
});

let middleware = applyMiddleware(thunk, logger);

const store = createStore(rootReducer, middleware);
export default store;