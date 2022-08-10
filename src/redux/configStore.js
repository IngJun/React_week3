import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import posts from './modules/posts';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const rootReducer = combineReducers({ posts });
const enhancer = applyMiddleware(...middlewares);

const store = configureStore({ reducer: rootReducer, enhancer });

export default store;
