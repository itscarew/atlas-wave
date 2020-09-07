import React, { useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "../layouts/main-layout";
import Signup from "../components/signup";
import { registerAdmin } from "../redux/actions/user.actions";

const AddAdminPage = ({ history, registerAdmin }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayout>
      <Signup history={history} registerAdmin={registerAdmin} />
    </MainLayout>
  );
};

export default connect(undefined, { registerAdmin })(AddAdminPage);
