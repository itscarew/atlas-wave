import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import Landing from "./components/Layouts/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ArticleForm from "./components/Articles/ArticleForm";
import Footer from "./components/Layouts/Footer";
import Explore from "./components/Explore/Explore";
import EditProfile from "./components/Profile/EditProfile";
import ArticlePage from "./components/Articles/ArticlePage";
import UsersProfile from "./components/UserProfile/UsersProfilePage";

import store from "./store/store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/user.actions";
import NotFoundPage from "./components/NotFound/NotFoundPage";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // Check for expired token
  // const currentTime = Date.now() / 1000; // to get in milliseconds
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());    // Redirect to login
  //   window.location.href = "./login";
  // }
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between ">
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/explore" component={Explore} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/articles/:articleId"
              component={ArticlePage}
            />
            <PrivateRoute exact path="/user/:userId" component={UsersProfile} />
            <PrivateRoute exact path="/create" component={ArticleForm} />
            <PrivateRoute exact path="/profile" component={EditProfile} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </div>
        <React.Fragment>
          <Footer />
        </React.Fragment>
      </div>
    </BrowserRouter>
  );
}

export default App;
