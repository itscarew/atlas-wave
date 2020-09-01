import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import isEmpty from "is-empty";
import MyArticles from "../components/my-articles";
import Welcome from "../components/welcome";
import PopularArticles from "../components/popular-articles";
import {
  setCurrentUserArticles,
  exploreArticles,
} from "../redux/actions/article.actions";
import MainLayout from "../layouts/main-layout";
import CustomBounceLoader from "../components/loader/bounce-loader";

const Dashboard = ({
  setCurrentUserArticles,
  exploreArticles,
  auth: { user },
  auth: {
    user: { _id },
  },
  articles: { articles, exploredArticles, loading },
}) => {
  const [limit, setLimit] = useState(5);

  const loadMore = () => {
    setLimit(limit + 5);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentUserArticles();
    exploreArticles();
  }, [setCurrentUserArticles, exploreArticles]);

  return (
    <MainLayout>
      <CustomBounceLoader
        loading={loading && isEmpty(articles || exploredArticles)}
      >
        {" "}
        <div className="flex items-top  mx-6 ">
          <div className="w-2/3 mx-4">
            {articles.length < 1 ? (
              <Welcome user={user} />
            ) : (
              <MyArticles
                articles={articles}
                limit={limit}
                loadMore={loadMore}
              />
            )}
          </div>
          <div className="w-1/3 h-screen overflow-y-auto mx-4 ">
            <PopularArticles articles={exploredArticles} userId={_id} />
          </div>
        </div>
      </CustomBounceLoader>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  articles: state.articles,
});
export default connect(mapStateToProps, {
  setCurrentUserArticles,
  exploreArticles,
})(Dashboard);
