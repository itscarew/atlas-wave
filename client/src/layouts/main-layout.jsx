import React from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import Footer from "../components/footer";

import ErrorMessage from "../components/error-message";

const MainLayout = ({ children, error: { err } }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <ErrorMessage err={err} />
      <div>
        <Header />
        <div className={`w-full`}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps)(MainLayout);
