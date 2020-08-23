import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (newUser, history) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .post("/user/register", newUser)
    .then((res) => {
      history.push("/login");
      dispatch(setUserLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
      dispatch(setUserLoaded());
    });
};

// Login - get user token
export const loginUser = (user) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .post("/user/login", user)
    .then((res) => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setUserLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
      dispatch(setUserLoaded());
    });
};

export const editCurrentUser = (user) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .patch("/user/profile", user)
    .then((res) => {
      dispatch(logoutUser());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    })
    .finally(() => {
      dispatch(setUserLoaded());
    });
};

export const editCurrentUserPassword = (userPassword) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .patch("/user/profile/password", userPassword)
    .then((res) => {
      dispatch(logoutUser());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    })
    .finally(() => {
      dispatch(setUserLoaded());
    });
};

// Remove User
export const deleteCurrentUser = () => (dispatch) => {
  axios
    .delete("/user/profile")
    .then(() => {
      dispatch(logoutUser());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

// set other users
export const setOtherUser = (userId) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .get(`/user/${userId}`)
    .then((res) => {
      dispatch({
        type: "SET_OTHER_USER",
        payload: res.data.data,
      });
      dispatch(setUserLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERROR",
        payload: err.response.data,
      });
      dispatch(setUserLoaded());
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: "USER_LOADING",
  };
};

// User loaded
export const setUserLoaded = () => {
  return {
    type: "USER_LOADED",
  };
};

// Clear Error
export const clearError = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearError());
};
