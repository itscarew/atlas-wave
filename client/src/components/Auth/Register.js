import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser } from "../../redux/actions/user.actions";
import { setViewPassword } from "../../redux/actions/viewPassword.actions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { GrFormPreviousLink } from "react-icons/gr";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      error: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { username, name, email, password } = this.state;
    const newUser = {
      username,
      name,
      email,
      password,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  viewPassword = () => {
    this.props.setViewPassword();
  };

  render() {
    const override = css`
      display: block;
      margin: 8rem auto;
    `;

    const { err } = this.state.error;
    const { status } = this.props.viewPassword;
    const { loading } = this.props.auth;

    return (
      <div className="w-full max-w-lg mx-auto mt-12">
        <form
          onSubmit={this.onSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
        >
          <div
            className="flex items-center mb-4 cursor-pointer "
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <GrFormPreviousLink size="1.5rem" />
            <p className="ml-2"> go back</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">
              Password
            </label>

            <div className="flex items-center">
              <input
                name="password"
                type={status ? "text" : "password"}
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                className="cursor-pointer"
                style={{ marginLeft: "-2em", zIndex: 2 }}
                onClick={this.viewPassword}
              >
                {status ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full flex items-center justify-center bg-teal-500 hover:bg-gray-900  text-white h-10  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? (
                <ClipLoader
                  css={override}
                  size={20}
                  color={"#fff"}
                  loading={loading}
                />
              ) : (
                " Sign Up"
              )}
            </button>
          </div>

          {err ? (
            <div className="text-center mt-4 text-red-500 text-sm"> {err} </div>
          ) : null}

          <p className="mt-4 text-center">
            Already have an account ?
            <Link className="text-teal-500" to="/login">
              {" "}
              Sign In.
            </Link>
          </p>
        </form>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  viewPassword: state.viewPassword,
});

export default connect(mapStateToProps, { registerUser, setViewPassword })(
  withRouter(Register)
);
