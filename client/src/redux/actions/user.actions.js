import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

// Register User
export const registerUser = (newUser, history) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .post("/user/register", newUser)
    .then((res) => {
      history.push("/signin");
      dispatch(setUserLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

//Register Admin
export const registerAdmin = (newUser, history) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .post("/user/register", newUser)
    .then((res) => {
      history.push("/admindashboard");
      dispatch(setUserLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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

      dispatch(getCurrentUserProfile());
      dispatch(setUserLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

//login admin users only
export const loginAdmin = (user, history) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .post("/user/login", user)
    .then((res) => {
      const { token } = res.data;
      const decoded = jwtDecode(token);

      if (decoded?.role === "admin") {
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        history.push("/admindashboard");
        dispatch(getCurrentUserProfile());
        dispatch(clearError());
        dispatch(setUserLoaded());
      } else {
        dispatch(
          alertError({ err: "You aren't an admin. Go to the sign up page " })
        );
        dispatch(setUserLoaded());
      }
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

//get current user profile || MAIN FOR USER
export const getCurrentUserProfile = () => (dispatch) => {
  axios
    .get("/user/profile")
    .then((res) => {
      dispatch(setCurrentUser(res.data.data));
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

export const editCurrentUser = (user) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .patch("/user/profile", user)
    .then((res) => {
      dispatch(getCurrentUserProfile());
      dispatch(setUserLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

export const editCurrentUserPassword = (userPassword) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .patch("/user/profile/password", userPassword)
    .then((res) => {
      dispatch(logoutUser());
      dispatch(clearError());
      dispatch(setUserLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

// Remove User (basic)
export const deleteCurrentUser = () => (dispatch) => {
  axios
    .delete("/user/profile")
    .then(() => {
      dispatch(logoutUser());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

//set AllUsers
export const setAllUsers = () => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .get(`/user`)
    .then((res) => {
      dispatch({
        type: "SET_ALL_USERS",
        payload: res.data.data,
      });
      dispatch(setUserLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
    });
};

//remove any user (admin-priviledge only)
export const deleteAnyUser = (userId) => (dispatch) => {
  axios
    .delete(`/user/${userId}`)
    .then(() => {
      dispatch({
        type: "DELETE_USERS",
        payload: userId,
      });
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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

//get Error
export const getError = (error) => {
  return {
    type: "GET_ERRORS",
    payload: error,
  };
};

//alert Error
export const alertError = (error) => (dispatch) => {
  dispatch(getError(error));
  dispatch(setUserLoaded());
  setTimeout(() => {
    dispatch(clearError());
  }, 5000);
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  //dispatch clear error
  dispatch(clearError());
};
