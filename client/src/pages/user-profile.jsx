import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import UserInfo from "../components/UserProfile/user-info";
import UserArticle from "../components/UserProfile/user-articles";

import { setOtherUser } from "../redux/actions/user.actions";
import { setOtherUserArticles } from "../redux/actions/article.actions";
import MainLayout from "../layouts/main-layout";
import CustomBounceLoader from "../components/loader/bounce-loader";

const UsersProfilePage = ({
  history,
  match: {
    params: { userId },
  },
  setOtherUser,
  setOtherUserArticles,
  articles: { otherUserArticles },
  auth: {
    isAuthenticated,
    otherUser,
    user: { name },
    loading,
  },
}) => {
  const [limit, setLimit] = useState(3);

  const loadMore = () => {
    setLimit(limit + 3);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      history.push("/signin");
    }
    setOtherUser(userId);
    setOtherUserArticles(userId);
  }, [userId, setOtherUser, setOtherUserArticles]);

  return (
    <MainLayout>
      <CustomBounceLoader loading={loading}>
        <div className="w-3/5 mx-auto">
          <UserInfo user={otherUser} authName={name} />
          <UserArticle
            articles={otherUserArticles}
            user={otherUser}
            authName={name}
            loadMore={loadMore}
            limit={limit}
          />
        </div>
      </CustomBounceLoader>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  articles: state.articles,
});

export default connect(mapStateToProps, { setOtherUser, setOtherUserArticles })(
  UsersProfilePage
);
