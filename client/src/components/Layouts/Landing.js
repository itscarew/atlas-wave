import React, { Component } from "react";

import { connect } from "react-redux";
import LandingContent from "./LandingContent";

class Landing extends Component {
  componentDidMount() {
    // If logged in and user navigates to Register page or Login Page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return <LandingContent />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
