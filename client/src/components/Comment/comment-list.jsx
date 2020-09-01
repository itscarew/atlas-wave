import React from "react";
import RemoveCommentButton from "../DeleteButton/delete-comment-button";
import moment from "moment";
import CustomLink from "../custom-link";
import { P } from "../text/text";

const CommentList = ({
  comments,
  auth: {
    user: { username, _id },
  },
}) => {
  return (
    <>
      {comments?.map((comment) => (
        <div
          key={comment._id}
          className=" flex justify-between items-center px-4 py-2 border border-gray-200"
        >
          <div className=" m-2">
            <CustomLink
              className="font-bold"
              to={`/user/${comment.user?._id || _id}`}
            >
              {comment.user?.username || username}
            </CustomLink>
            <P className="text-gray-700 text-base">{comment.content}</P>
            <P className="text-gray-700 text-xs ">
              {moment(comment.createdAt).fromNow()}
            </P>
          </div>
          {_id === comment.user?._id || _id === comment.user ? (
            <RemoveCommentButton commentId={comment._id} />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default CommentList;
