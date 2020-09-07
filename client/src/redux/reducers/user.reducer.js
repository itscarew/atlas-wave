const isEmpty = require("is-empty");

const INITIAL_STATE = {
  user: {},
  otherUser: {},
  isAuthenticated: false,
  loading: false,
  allUsers: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: { ...action.payload },
      };
    case "SET_OTHER_USER":
      return {
        ...state,
        otherUser: { ...action.payload },
      };
    case "SET_ALL_USERS":
      return {
        ...state,
        allUsers: [...action.payload],
      };
    case "DELETE_USERS":
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user._id !== action.payload),
      };
    case "USER_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
