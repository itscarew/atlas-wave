import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "../layouts/main-layout";
import FilterArticles from "../components/filtered-articles";

import { exploreArticles } from "../redux/actions/article.actions";

//react-icons
import { MdExplore } from "react-icons/md";
import CustomBounceLoader from "../components/loader/bounce-loader";

import isEmpty from "is-empty";

const ExplorePage = ({
  exploreArticles,
  auth: {
    isAuthenticated,
    user: { _id },
  },
  articles: { exploredArticles, loading },
}) => {
  const [limit, setLimit] = useState(5);

  const loadMore = () => {
    setLimit(limit + 5);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    exploreArticles();
  }, []);

  return (
    <MainLayout>
      <CustomBounceLoader loading={loading && isEmpty(exploredArticles)}>
        <div className="w-3/5 mx-auto">
          <div className="flex my-4 items-center ">
            <p className="text-3xl">
              {isAuthenticated
                ? "Articles you may like"
                : "Explore Newwave. Join Us"}
            </p>
            <MdExplore className="ml-2" size="2.5rem" color="#38b2ac" />
          </div>

          <FilterArticles
            articles={exploredArticles}
            userId={_id}
            limit={limit}
            loadMore={loadMore}
          />
        </div>
      </CustomBounceLoader>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  auth: state.auth,
});

export default connect(mapStateToProps, { exploreArticles })(ExplorePage);
