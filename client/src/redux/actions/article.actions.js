import axios from "axios";

//set all articles for a user
export const setCurrentUserArticles = () => (dispatch) => {
  dispatch(articleLoading());
  axios
    .get("/user/profile/articles")
    .then((articles) => {
      dispatch({
        type: "SET_CURRENT_USER_ARTICLE",
        payload: articles.data.data,
      });
      dispatch(articleLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
      dispatch(articleLoaded());
    });
};

//find and display a particular article
export const setOneArticle = (articleId) => (dispatch) => {
  dispatch(articleLoading());
  axios
    .get(`/articles/${articleId}`)
    .then((articles) => {
      dispatch({
        type: "SET_ONE_ARTICLE",
        payload: articles.data.data,
      });
      dispatch(clearError());
      dispatch(articleLoaded());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

//find and display all articles
export const exploreArticles = () => (dispatch) => {
  dispatch(articleLoading());
  axios
    .get(`/articles/explore`)
    .then((articles) => {
      dispatch({
        type: "SET_EXPLORED_ARTICLES",
        payload: articles.data.data,
      });
      dispatch(clearError());
      dispatch(articleLoaded());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
      dispatch(articleLoaded());
    });
};

//create/post an article
export const createArticle = (article, history) => (dispatch) => {
  dispatch(articleLoading());
  axios
    .post(`/articles`, article)
    .then((article) => {
      dispatch({
        type: "CREATE_ARTICLE",
        payload: article.data.data,
      });
      history.push("/dashboard");
      dispatch(clearError());
      dispatch(articleLoaded());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
      dispatch(articleLoaded());
    });
};

//delete an article
export const deleteArticle = (articleId) => (dispatch) => {
  axios
    .delete(`/user/profile/articles/${articleId}`)
    .then(() => {
      dispatch({
        type: "DELETE_ARTICLE",
        payload: articleId,
      });
      dispatch(articleLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const setOtherUserArticles = (userId) => (dispatch) => {
  dispatch(articleLoading());
  axios
    .get(`/articles/user/${userId}`)
    .then((res) => {
      dispatch({
        type: "SET_OTHER_USER_ARTICLE",
        payload: res.data.data,
      });
      dispatch(articleLoaded());
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
      dispatch(articleLoaded());
    });
};

//like an article
export const likeArticle = (articleId, userId) => (dispatch) => {
  axios
    .post(`/articles/like/${articleId}`)
    .then((res) => {
      dispatch(setCurrentUserArticles());
      dispatch(setOtherUserArticles(userId));
      dispatch(exploreArticles());
      dispatch(setOneArticle(articleId));
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

//unlike article
export const unlikeArticle = (articleId, userId) => (dispatch) => {
  axios
    .post(`/articles/unlike/${articleId}`)
    .then((res) => {
      dispatch(setCurrentUserArticles());
      dispatch(setOtherUserArticles(userId));
      dispatch(exploreArticles());
      dispatch(setOneArticle(articleId));
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

// Article loading
export const articleLoading = () => {
  return {
    type: "ARTICLE_LOADING",
  };
};

// Article loaded
export const articleLoaded = () => {
  return {
    type: "ARTICLE_LOADED",
  };
};

// clear Error
export const clearError = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
