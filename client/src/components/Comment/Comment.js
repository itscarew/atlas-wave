import React, { Component } from "react";
import { connect } from "react-redux";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {
  setArticleComment,
  addArticleComment,
} from "../../redux/actions/comment.actions";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  componentDidMount() {
    const { articleId } = this.props;
    this.props.setArticleComment(articleId);
  }

  onChange = (e) => {
    this.setState({ content: e.target.value });
  };

  onComment = (e) => {
    e.preventDefault();
    const comment = {
      content: this.state.content,
    };
    const { articleId } = this.props;
    this.props.addArticleComment(articleId, comment);
    this.setState({ content: "" });
  };

  render() {
    const { content } = this.state;
    const { comments, loading } = this.props.comments;
    const { auth } = this.props;

    return (
      <div>
        <CommentList comments={comments} auth={auth} loading={loading} />
        <CommentForm
          content={content}
          onComment={this.onComment}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  comments: state.comments,
});

export default connect(mapStateToProps, {
  setArticleComment,
  addArticleComment,
})(Comment);
