import React from "react";
import { RiArticleLine } from "react-icons/ri";
import SlicedArticles from "./sliced-articles";
import { H4 } from "./text/text";

const MyArticles = ({ articles, limit, loadMore }) => {
  return (
    <>
      <div className="w-full flex my-4 items-center ">
        <H4> Your articles </H4>
        <RiArticleLine className="ml-2" size="1.5rem" />
      </div>

      <div className="w-full flex flex-col">
        <SlicedArticles articles={articles} limit={limit} loadMore={loadMore} />
      </div>
    </>
  );
};

export default MyArticles;
