import React, { Component } from "react";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import UserArticle from "./UserArticles";

import { setOtherUser } from "../../redux/actions/user.actions";
import { setOtherUserArticles } from "../../redux/actions/article.actions";

class UsersProfile extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.setOtherUser(userId);
    this.props.setOtherUserArticles(userId);
  }

  componentDidUpdate(prevProps, nextProps) {
    const { userId } = this.props.match.params;
    if (prevProps.match.params.userId !== userId) {
      this.props.setOtherUser(userId);
      this.props.setOtherUserArticles(userId);
    }
  }

  render() {
    const {
      otherUser,
      loading,
      user: { name },
    } = this.props.auth;
    const { otherUserArticles } = this.props.articles;
    return (
      <div className="w-3/5 mx-auto">
        <UserInfo user={otherUser} authName={name} loading={loading} />
        <UserArticle
          articles={otherUserArticles}
          loading={loading}
          user={otherUser}
          authName={name}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  articles: state.articles,
});

export default connect(mapStateToProps, { setOtherUser, setOtherUserArticles })(
  UsersProfile
);
