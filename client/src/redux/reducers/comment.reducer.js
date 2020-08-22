const INITIAL_STATE = {
  comments: [],
  loading: false,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ARTICLE_COMMENT":
      return {
        ...state,
        comments: [...action.payload],
      };
    case "ADD_ARTICLE_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload] 
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    case "COMMENT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "COMMENT_LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
