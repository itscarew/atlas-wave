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
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(getError(err.response.data));
      dispatch(setUserLoaded());
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
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(getError(err.response.data));
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
      // // Decode token to get user data
      // const decoded = jwt_decode(token);
      // // Set current user
      // dispatch(setCurrentUser(decoded));
      dispatch(getCurrentUserProfile());
      dispatch(setUserLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(getError(err.response.data));
      dispatch(setUserLoaded());
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
          getError({ err: "You aren't an admin. Go to the sign up page " })
        );
        dispatch(setUserLoaded());
      }
    })
    .catch((err) => {
      dispatch(getError(err.response.data));
      dispatch(setUserLoaded());
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
      dispatch(getError(err.response.data));
      dispatch(setUserLoaded());
    });
};

export const editCurrentUser = (user) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .patch("/user/profile", user)
    .then((res) => {
      dispatch(getCurrentUserProfile());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(getError(err.response.data));
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
      dispatch(getError(err.response.data));
    })
    .finally(() => {
      dispatch(setUserLoaded());
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
      dispatch(getError(err.response.data));
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
      dispatch(getError(err.response.data));
      dispatch(setUserLoaded());
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
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch(getError(err.response.data));
      dispatch(setUserLoaded());
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
      dispatch(getError(err.response.data));
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

//get Error
export const getError = (error) => {
  return {
    type: "GET_ERRORS",
    payload: error,
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
