const INITIAL_STATE = {
  articles: [],
  article: {},
  exploredArticles: [],
  otherUserArticles: [],
  loading: false,
};

const articleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_ARTICLE":
      return {
        ...state,
        articles: [...action.payload],
      };
    case "SET_OTHER_USER_ARTICLE":
      return {
        ...state,
        otherUserArticles: [...action.payload],
      };
    case "CREATE_ARTICLE":
      return {
        ...state,
        articles: [action.payload, ...state.articles],
      };
    case "SET_ONE_ARTICLE":
      return {
        ...state,
        article: action.payload,
      };
    case "SET_EXPLORED_ARTICLES": {
      return {
        ...state,
        exploredArticles: [...action.payload],
      };
    }
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
        otherUserArticles: state.otherUserArticles.filter(
          (article) => article._id !== action.payload
        ),
        exploredArticles: state.exploredArticles.filter(
          (article) => article._id !== action.payload
        ),
      };

    case "ARTICLE_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ARTICLE_LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default articleReducer;
