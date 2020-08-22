import React from "react";

import { MdExplore } from "react-icons/md";

import Article from "../Articles/Article";

import { BsFillPlusCircleFill } from "react-icons/bs";

const ExploreGallery = ({
  articles,
  loading,
  userId,
  limit,
  loadMore,
  isAuthenticated,
}) => {
  const filterArticles = articles?.filter(
    (article) => article.user?._id !== userId
  );
  return (
    <div className="w-3/5 mx-auto">
      <div className="flex my-4 items-center ">
        <p className="text-3xl">
          {" "}
          {isAuthenticated
            ? "Articles you may like"
            : "Explore Newwave. Join Us"}{" "}
        </p>
        <MdExplore className="ml-2" size="2.5rem" color="#38b2ac" />
      </div>
      {filterArticles?.slice(0, limit).map((article) => (
        <Article key={article._id} article={article} loading={loading} />
      ))}

      <div
        onClick={() => loadMore()}
        className="flex mx-auto my-12 justify-center "
      >
        <BsFillPlusCircleFill
          size="2rem"
          fill="#1a202c"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ExploreGallery;
