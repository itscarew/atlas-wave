import React from "react";
import { FaWpexplorer } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import { BsArrowRight } from "react-icons/bs";

const Info = ({ articles, loading }) => {
  const override = css`
    display: block;
    margin: 8rem auto;
  `;
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
        <div>
          <div className="flex my-4 items-center ">
            <p className="text-2xl"> Popular Articles </p>
            <FaWpexplorer className="ml-2" size="1.5rem" />
          </div>
          <div>
            {articles?.slice(0, 6).map((articles, index) => (
              <Link
                key={articles._id}
                to={`/articles/${articles._id}`}
                className="flex w-full h-auto rounded-t overflow-hidden mb-4 "
              >
                <div className="w-1/5 flex items-start justify-end pt-2 ">
                  <p className="text-5xl text-gray-600 "> 0{index + 1} </p>
                </div>
                <div className="w-4/5 p-4">
                  <div className="mb-4">
                    <div className="text-gray-900 font-bold text-sm mb-2">
                      {articles.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      {articles.content.split(" ").splice(0, 10).join(" ") +
                        "..."}
                    </p>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {articles.user?.name}
                    </p>
                    <p className="text-gray-600">
                      {moment(articles.createdAt).format("MMMM Do, YYYY")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <Link className="m-6 block text-teal-500 " to="/explore">
              explore more <BsArrowRight className="inline ml-2" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
