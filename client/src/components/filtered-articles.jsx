import React from "react";
import SlicedArticles from "./sliced-articles";

const FilterArticles = ({ articles, userId, limit, loadMore }) => {
  const filterArticles = articles?.filter(
    (article) => article.user?._id !== userId
  );
  return (
    <>
      <SlicedArticles
        articles={filterArticles}
        limit={limit}
        loadMore={loadMore}
      />
    </>
  );
};

export default FilterArticles;
