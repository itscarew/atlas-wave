import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  likeArticle,
  unlikeArticle,
} from "../../redux/actions/article.actions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = ({
  likes,
  auth: {
    user: { userId },
    isAuthenticated,
  },
  articleUserId,
  articleId,
  likeArticle,
  unlikeArticle,
}) => {
  const findUserLike = () => {
    if (likes?.filter((like) => like?.user?._id === userId).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {isAuthenticated ? (
        <div className=" flex cursor-pointer">
          {findUserLike() ? (
            <AiFillHeart
              size="1.5em"
              fill="red"
              onClick={() => unlikeArticle(articleId, articleUserId)}
            />
          ) : (
            <AiOutlineHeart
              size="1.5em"
              onClick={() => likeArticle(articleId, articleUserId)}
            />
          )}
        </div>
      ) : (
        <Link to="/login">
          {" "}
          <AiFillHeart size="1.5em" />{" "}
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likeArticle, unlikeArticle })(
  LikeButton
);
