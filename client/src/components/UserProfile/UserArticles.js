import React from "react";
import { RiArticleLine } from "react-icons/ri";
import isEmpty from "is-empty";
import Article from "../Articles/Article";

const UserArticle = ({ authName, user, articles, loading }) => {
  return (
    <div>
      <div className="flex my-4 items-center ">
        <p className="text-2xl"> Articles </p>
        <RiArticleLine className="ml-2" size="1.5rem" />
      </div>

      {isEmpty(articles) ? (
        <p className=" my-2 text-2xl">
          {authName === user?.name
            ? "You do not have any Article Yet  "
            : `${
                user?.name ? user?.name : "User"
              } does not have any Article Yet`}
        </p>
      ) : (
        <div className="flex flex-col-reverse">
          {articles?.map((article) => {
            return (
              <Article key={article._id} article={article} loading={loading} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserArticle;
