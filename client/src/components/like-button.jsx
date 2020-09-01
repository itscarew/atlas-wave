import React from "react";
import { connect } from "react-redux";
import { likeArticle, unlikeArticle } from "../redux/actions/article.actions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CustomLink from "./custom-link";

const LikeButton = ({
  likes,
  auth: {
    user: { _id },
    isAuthenticated,
  },
  articleUserId,
  articleId,
  likeArticle,
  unlikeArticle,
}) => {
  const findUserLike = () => {
    if (likes?.filter((like) => like?.user?._id === _id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
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
        <CustomLink to="/signin">
          {" "}
          <AiFillHeart size="1.5em" />{" "}
        </CustomLink>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likeArticle, unlikeArticle })(
  LikeButton
);
