import React from "react";
import Article from "./article";
import { BsFillPlusCircleFill } from "react-icons/bs";

const SlicedArticles = ({ articles, limit, loadMore }) => {
  return (
    <>
      {articles?.slice(0, limit).map((article) => (
        <Article key={article._id} article={article} />
      ))}

      {articles.length > limit ? (
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
      ) : null}
    </>
  );
};

export default SlicedArticles;
