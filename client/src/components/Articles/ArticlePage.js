import React, { Component } from "react";
import { connect } from "react-redux";
import Article from "./Article";
import Comment from "../Comment/Comment";

import { setOneArticle } from "../../redux/actions/article.actions";

class ArticlePage extends Component {
  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.props.setOneArticle(articleId);
  }

  render() {
    const { articleId } = this.props.match.params;
    const { article, loading } = this.props.articles;

    return (
      <div className="w-3/5 mx-auto">
        <Article article={article} loading={loading} />
        <Comment articleId={articleId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  articles: state.articles,
});

export default connect(mapStateToProps, { setOneArticle })(ArticlePage);
