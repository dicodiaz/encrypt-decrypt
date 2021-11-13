import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import guessReducer from './ducks/guess';
import quoteReducer from './ducks/quote';
import scoreReducer from './ducks/score';

const reducer = combineReducers({
  quoteReducer,
  guessReducer,
  scoreReducer,
  // additional reducers could be added here
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
