import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import posts from './modules/posts';

const rootReducer = combineReducers({ posts });

const store = configureStore({ reducer: rootReducer });

export default store;
