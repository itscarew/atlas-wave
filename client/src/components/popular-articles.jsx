import React from "react";
import moment from "moment";

import { H2, H4, H7, P } from "./text/text";
import CustomLink from "./custom-link";

//react icons
import { BsArrowRight } from "react-icons/bs";
import { FaWpexplorer } from "react-icons/fa";

const PopularArticles = ({ articles, userId }) => {
  const filterArticles = articles?.filter(
    (article) => article.user?._id !== userId
  );
  return (
    <>
      <div className="flex my-4 items-center ">
        <H4> Popular Articles </H4>
        <FaWpexplorer className="ml-2" size="1.5rem" />
      </div>
      <div>
        {filterArticles?.slice(0, 6).map((article, index) => (
          <CustomLink
            key={article._id}
            to={`/articles/${article._id}`}
            className="flex w-full h-auto rounded-t overflow-hidden mb-4 "
          >
            <div className="w-1/5 flex items-start justify-end pt-2 ">
              <H2 className="text-5xl text-gray-600 "> 0{index + 1} </H2>
            </div>
            <div className="w-4/5 p-4">
              <div className="mb-4">
                <div className="text-gray-900 font-bold text-sm mb-2">
                  {article.title}
                </div>
                <P className="text-gray-700 text-base">
                  {article.content.split(" ").splice(0, 10).join(" ") + "..."}
                </P>
              </div>

              <div className="flex flex-col">
                <H7 className="text-gray-900 leading-none">
                  {article.user?.name}
                </H7>
                <H7 className="text-gray-600">
                  {moment(article.createdAt).format("MMMM Do, YYYY")}
                </H7>
              </div>
            </div>
          </CustomLink>
        ))}
        <CustomLink className="m-6 block text-teal-500 " to="/explore">
          explore more <BsArrowRight className="inline ml-2" />
        </CustomLink>
      </div>
    </>
  );
};

export default PopularArticles;
