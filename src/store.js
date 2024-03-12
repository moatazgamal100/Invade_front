// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './Reducers/reducers'; // Create a rootReducer combining all your reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
