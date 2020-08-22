import { combineReducers } from "redux";
import userReducer from "./reducers/user.reducer";
import errorReducer from "./reducers/error.reducer";
import articleReducer from "./reducers/article.reducer";
import commentReducer from "./reducers/comment.reducer";
import viewPasswordReducer from "./reducers/viewPassword.reducer";

const rootReducer = combineReducers({
  auth: userReducer,
  error: errorReducer,
  articles: articleReducer,
  comments: commentReducer,
  viewPassword: viewPasswordReducer,
});

export default rootReducer;
