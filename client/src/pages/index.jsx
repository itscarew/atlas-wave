import React, { useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "../layouts/main-layout";
import IndexContent from "../components/indexcontent";

const IndexPage = ({ auth: { isAuthenticated }, history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [history, isAuthenticated]);

  return (
    <MainLayout index>
      <IndexContent />
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(IndexPage);
