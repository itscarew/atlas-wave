import React, { Component } from "react";
import { connect } from "react-redux";

import isEmpty from "is-empty";
import MyArticles from "./MyArticles";
import Popular from "./Popular";
import StartWriting from "./StartWriting";
import {
  setCurrentUserArticles,
  exploreArticles,
} from "../../redux/actions/article.actions";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.setCurrentUserArticles();
      this.props.exploreArticles();
    }
  }

  render() {
    const {
      user,
      user: { userId },
    } = this.props.auth;
    const { articles, exploredArticles, loading } = this.props.articles;
    const filterArticles = exploredArticles?.filter(
      (article) => article.user?._id !== userId
    );
    return (
      <div className="flex items-top  mx-6 ">
        <div className="w-2/3 mx-4">
          {isEmpty(articles) ? (
            <StartWriting user={user} />
          ) : (
            <MyArticles articles={articles} loading={loading} />
          )}
        </div>
        <div className="w-1/3 mx-4">
          <Popular articles={filterArticles} loading={loading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  articles: state.articles,
});
export default connect(mapStateToProps, {
  setCurrentUserArticles,
  exploreArticles,
})(Dashboard);
