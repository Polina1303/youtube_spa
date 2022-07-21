import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import authReducer from "./authReducer";
import { favoriteReducer } from "./favoriteReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  favorite: favoriteReducer,
  posts: postsReducer,
});

export default rootReducer;
