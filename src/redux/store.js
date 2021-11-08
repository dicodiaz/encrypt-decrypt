import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import quoteReducer from './ducks/quote';

const reducer = combineReducers({
  quoteReducer,
  // additional reducers could be added here
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
