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
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
      dispatch(articleLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
      dispatch(articleLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
      history.push("/home");
      dispatch(articleLoaded());
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
    })
    .catch((err) => {
      dispatch(alertError(err.response.data));
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
  dispatch(articleLoaded());
  setTimeout(() => {
    dispatch(clearError());
  }, 5000);
};
