import React from "react";
import { RiArticleLine } from "react-icons/ri";
import Article from "../Articles/Article";

const MyArticles = ({ articles, loading }) => {
  return (
    <React.Fragment>
      <div className="flex my-4 items-center ">
        <p className="text-2xl"> Your articles </p>
        <RiArticleLine className="ml-2" size="1.5rem" />
      </div>

      <div className="flex flex-col-reverse">
        {articles.map((article) => (
          <Article key={article._id} article={article} loading={loading} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default MyArticles;
