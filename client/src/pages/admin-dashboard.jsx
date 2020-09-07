import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "../layouts/main-layout";
import AllUsers from "../components/admin/users";
import AllAdmins from "../components/admin/admins";

import { setAllUsers } from "../redux/actions/user.actions";

const AdminDashBoardPage = ({ auth: { allUsers }, setAllUsers }) => {
  const [limit, setLimit] = useState(5);

  const loadMore = () => {
    setLimit(limit + 5);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setAllUsers();
  }, []);

  return (
    <MainLayout>
      <div className="w-11/12 mx-auto">
        <AllAdmins loadMore={loadMore} limit={limit} allUsers={allUsers} />
        <AllUsers loadMore={loadMore} limit={limit} allUsers={allUsers} />
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAllUsers })(AdminDashBoardPage);
