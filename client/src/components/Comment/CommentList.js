import React from "react";
import RemoveCommentButton from "./DeleteCommentButton";
import moment from "moment";

import { Link } from "react-router-dom";

const CommentList = ({
  comments,
  loading,
  auth: {
    user: { username, userId },
  },
}) => {
  return (
    <div>
      {loading ? (
        <div className="text-teal-500"> Loading Comments ...</div>
      ) : (
        <div>
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className=" flex justify-between items-center px-4 py-2 border border-gray-200"
            >
              <div className=" m-2">
                <Link
                  className="font-bold"
                  to={`/user/${comment.user?._id || userId}`}
                >
                  {comment.user?.username || username}
                </Link>
                <p className="text-gray-700 text-base">{comment.content}</p>
                <p className="text-gray-700 text-xs ">
                  {moment(comment.createdAt).fromNow()}
                </p>
              </div>
              {userId === comment.user?._id || userId === comment.user ? (
                <RemoveCommentButton commentId={comment._id} />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
