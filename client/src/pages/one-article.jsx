import React, { useEffect } from "react";
import { connect } from "react-redux";
import Article from "../components/article";

import { setOneArticle } from "../redux/actions/article.actions";
import MainLayout from "../layouts/main-layout";
import Comment from "../components/Comment/comment";
import CustomBounceLoader from "../components/loader/bounce-loader";

import isEmpty from "is-empty";

const OneArticlePage = ({
  setOneArticle,
  articles: { article, loading },
  match: {
    params: { articleId },
  },
  auth: { isAuthenticated },
  history,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      history.push("/signin");
    }
    setOneArticle(articleId);
    //eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <MainLayout>
      <CustomBounceLoader loading={loading && isEmpty(article)}>
        <div className="w-3/5 mx-auto">
          <Article article={article} />
          <Comment articleId={articleId} />
        </div>
      </CustomBounceLoader>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  articles: state.articles,
});

export default connect(mapStateToProps, { setOneArticle })(OneArticlePage);
