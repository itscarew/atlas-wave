import React, { Component } from "react";
import ExploreGallery from "./ExploreGallery";
import { connect } from "react-redux";

import { exploreArticles } from "../../redux/actions/article.actions";

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
    };
  }

  onLoadMore = () => {
    this.setState({
      limit: this.state.limit + 5,
    });
  };

  componentDidMount() {
    this.props.exploreArticles();
  }
  render() {
    const { exploredArticles, loading } = this.props.articles;
    const {
      isAuthenticated,
      user: { userId },
    } = this.props.auth;
    return (
      <div>
        <ExploreGallery
          articles={exploredArticles}
          loading={loading}
          userId={userId}
          limit={this.state.limit}
          loadMore={this.onLoadMore}
          isAuthenticated={isAuthenticated}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  auth: state.auth,
});

export default connect(mapStateToProps, { exploreArticles })(Explore);
