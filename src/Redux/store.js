import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PostReducer } from "./PostsReducer";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({ post: PostReducer });

const middleware = [thunk, logger];

const poststore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default poststore;
