import React, { useEffect } from "react";
import { connect } from "react-redux";

import { loginAdmin } from "../redux/actions/user.actions";

import Signin from "../components/signin";
import MainLayout from "../layouts/main-layout";

const AdminLoginPage = ({
  history,
  auth: {
    isAuthenticated,
    user: { role },
  },
  loginAdmin,
}) => {
  useEffect(() => {
    if (isAuthenticated && role === "admin") {
      history.push("/admindashboard");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <MainLayout>
      {" "}
      <Signin history={history} loginAdmin={loginAdmin} />{" "}
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  viewPassword: state.viewPassword,
});

export default connect(mapStateToProps, { loginAdmin })(AdminLoginPage);
