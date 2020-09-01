import React from "react";
import moment from "moment";
import CustomLink from "./custom-link";

import LikeArticleButton from "./like-button";
import DeleteArticleButton from "./DeleteButton/delete-article-button";
import Likers from "./likers";
import { P } from "./text/text";

//react icons
import { AiOutlineComment } from "react-icons/ai";

const Article = ({ article }) => {
  const currentPath = window.location.pathname;
  return (
    <div className="w-full mx-auto rounded overflow-hidden shadow mb-12">
      <h1 className="font-bold mb-2 text-3xl px-6 py-4">{article?.title}</h1>
      <div className="flex">
        <CustomLink to={`/user/${article?.user?._id}`}>
          <P className="ml-6 mb-2 font-bold text-teal-500 ">
            {article?.user?.name}
          </P>{" "}
        </CustomLink>
        <P className="text-gray-700 text-sm ml-6 mb-2 ">
          {moment(article?.createdAt).format("MMMM Do, YYYY")}
        </P>
      </div>
      <img
        className="w-full height-28rem  object-contain"
        src={`/articles/articleImage/${article?.articleImage}`}
        alt={`/${article?.articleImage}`}
      />
      <P className="text-gray-700 text-base px-6 py-4">{article?.content}</P>

      <div className="px-6 py-4 flex justify-between ">
        <div className=" flex items-center">
          <CustomLink
            to={`/articles/${article?._id}`}
            className="my-1 text-sm font-semibold text-gray-700 mr-2"
          >
            <AiOutlineComment size="1.5em" />
          </CustomLink>
          <div className="flex mx-2 my-1 text-sm font-semibold text-gray-700 mr-2">
            <LikeArticleButton
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
            <DeleteArticleButton
              articleId={article?._id}
              articleUserId={article?.user?._id}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Article;
