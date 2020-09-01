import React from "react";
import { RiArticleLine } from "react-icons/ri";
import SlicedArticles from "../sliced-articles";

const UserArticle = ({ authName, user, articles, loadMore, limit }) => {
  return (
    <>
      <div className="flex my-4 items-center ">
        <p className="text-2xl"> Articles </p>
        <RiArticleLine className="ml-2" size="1.5rem" />
      </div>

      {articles.length < 1 ? (
        <p className=" my-2 text-2xl">
          {authName === user?.name
            ? "You do not have any Article Yet  "
            : `${
                user?.name ? user?.name : "User"
              } does not have any Article Yet`}
        </p>
      ) : (
        <div className="flex flex-col">
          <SlicedArticles
            articles={articles}
            loadMore={loadMore}
            limit={limit}
          />
        </div>
      )}
    </>
  );
};

export default UserArticle;
