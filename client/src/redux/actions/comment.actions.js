import axios from "axios";

//set all comments for an article
export const setArticleComment = (articleId) => (dispatch) => {
  dispatch(commentLoading());
  axios
    .get(`/comments/articles/${articleId}`)
    .then((comments) => {
      dispatch({
        type: "SET_ARTICLE_COMMENT",
        payload: comments.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    })
    .finally(() => {
      dispatch(commentLoaded());
      dispatch(clearError());
    });
};

//post or add comments to an article
export const addArticleComment = (articleId, comment) => (dispatch) => {
  axios
    .post(`/comments/articles/${articleId}`, comment)
    .then((comment) => {
      dispatch({
        type: "ADD_ARTICLE_COMMENT",
        payload: comment.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    })
    .finally(() => {
      dispatch(commentLoaded());
      dispatch(clearError());
    });
};

//delete comments from an article
export const deleteComment = (commentId) => (dispatch) => {
  axios
    .delete(`/comments/${commentId}`)
    .then(() => {
      dispatch({
        type: "DELETE_COMMENT",
        payload: commentId,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    })
    .finally(() => {
      dispatch(commentLoaded());
      dispatch(clearError());
    });
};

// Comment loading
export const commentLoading = () => {
  return {
    type: "COMMENT_LOADING",
  };
};

// Comment Loaded
export const commentLoaded = () => {
  return {
    type: "COMMENT_LOADED",
  };
};

// clear Error
export const clearError = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
