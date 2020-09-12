import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import {
  setArticleComment,
  addArticleComment,
} from "../../redux/actions/comment.actions";

const Comment = ({
  auth,
  comments: { comments },
  articleId,
  setArticleComment,
  addArticleComment,
}) => {
  const initialState = { content: "" };
  const [state, setstate] = useState(initialState);

  const onChange = (e) => {
    setstate({ ...state, content: e.target.value });
  };

  const onComment = (e) => {
    e.preventDefault();
    const comment = state;
    addArticleComment(articleId, comment);
    setstate({ ...state, content: "" });
  };

  useEffect(() => {
    setArticleComment(articleId);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <CommentList comments={comments} auth={auth} />
      <CommentForm
        content={state.content}
        onComment={onComment}
        onChange={onChange}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  comments: state.comments,
});

export default connect(mapStateToProps, {
  setArticleComment,
  addArticleComment,
})(Comment);
