import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeArticleButton/LikeButton";

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import { AiOutlineComment } from "react-icons/ai";
import moment from "moment";
import DeleteButton from "../DeleteArticleButton/DeleteButton";
import Likers from "./Likers";

const Article = ({ article, loading }) => {
  const override = css`
    display: block;
    margin: 8rem auto;
  `;

  const currentPath = window.location.pathname;

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-top w-full h-screen">
          <HashLoader
            css={override}
            size={100}
            color={"#38b2ac"}
            loading={loading}
          />
        </div>
      ) : (
        <div className="mx-auto rounded overflow-hidden shadow mb-12">
          <h1 className="font-bold mb-2 text-3xl px-6 py-4">
            {article?.title}
          </h1>
          <div className="flex">
            <Link to={`/user/${article?.user?._id}`}>
              <p className="ml-6 mb-2 font-bold text-teal-500 ">
                {article?.user?.name}
              </p>{" "}
            </Link>
            <p className="text-gray-700 text-sm ml-6 mb-2 ">
              {moment(article?.createdAt).format("MMMM Do, YYYY")}
            </p>
          </div>
          <img
            className="w-full height-28rem  object-contain"
            src={`/articles/articleImage/${article?.articleImage}`}
            alt={`/${article?.articleImage}`}
          />
          <p className="text-gray-700 text-base px-6 py-4">
            {article?.content}
          </p>

          <div className="px-6 py-4 flex justify-between ">
            <div className=" flex items-center">
              <Link
                to={`/articles/${article?._id}`}
                className="my-1 text-sm font-semibold text-gray-700 mr-2"
              >
                <AiOutlineComment size="1.5em" />
              </Link>
              <div className="flex mx-2 my-1 text-sm font-semibold text-gray-700 mr-2">
                <LikeButton
                  articleId={article?._id}
                  likes={article?.likes}
                  articleUserId={article?.user?._id}
                />

                <Likers
                  noOfLikes={article?.likes?.length}
                  likes={article?.likes}
                  articleUserId={article?.user?._id}
                />
              </div>
            </div>
            <div className="inline-block  my-1 mr-4">
              {!currentPath.includes("articles") ? (
                <DeleteButton
                  articleId={article?._id}
                  articleUserId={article?.user?._id}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
