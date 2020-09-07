import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./private-route/private-route";
import AdminPrivateRoute from "./private-route/admin-private-route";

import store from "./store/store";

import setAuthToken from "./utils/setAuthToken";
import { getCurrentUserProfile } from "./redux/actions/user.actions";
import NotFoundPage from "./pages/not-found";
import IndexPage from "./pages";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import ExplorePage from "./pages/explore";
import DashboardPage from "./pages/home";
import UserProfilePage from "./pages/user-profile";
import OneArticlePage from "./pages/one-article";
import EditUserPage from "./pages/edit-user";
import CreateArticlePage from "./pages/article-form";

import AdminLoginPage from "./pages/admin";
import AdminDashBoardPage from "./pages/admin-dashboard";
import AddAdminPage from "./pages/add-admin";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  // const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(getCurrentUserProfile());

  // Check for expired token
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
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/explore" component={ExplorePage} />
        <Route exact path="/admin" component={AdminLoginPage} />
        <AdminPrivateRoute
          exact
          path="/admindashboard"
          component={AdminDashBoardPage}
        />
        <AdminPrivateRoute exact path="/addadmin" component={AddAdminPage} />

        <PrivateRoute exact path="/home" component={DashboardPage} />
        <PrivateRoute
          exact
          path="/articles/:articleId"
          component={OneArticlePage}
        />
        <PrivateRoute exact path="/user/:userId" component={UserProfilePage} />
        <PrivateRoute exact path="/create" component={CreateArticlePage} />
        <PrivateRoute exact path="/profile" component={EditUserPage} />

        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
