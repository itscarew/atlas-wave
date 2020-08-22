import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { GrFormPreviousLink } from "react-icons/gr";

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { editCurrentUser } from "../../redux/actions/user.actions";
import { logoutUser } from "../../redux/actions/user.actions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      email: "",
    };
  }

  componentDidMount() {
    const {
      user: { username, name, email },
    } = this.props.auth;
    this.setState({ username, name, email });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editCurrentUser(this.state);
  };

  render() {
    const override = css`
      display: block;
      margin: 8rem auto;
    `;
    const { err } = this.props.error;
    const { loading } = this.props.auth;
    return (
      <div className="w-full  mx-auto mt-6">
        <form onSubmit={this.onSubmit} className="bg-white px-8 pt-4 pb-4 mb-2">
          <div className="flex items-center mb-4 cursor-pointer justify-between ">
            <div
              className="flex items-center mb-4 cursor-pointer "
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              <GrFormPreviousLink size="1.5rem" />
              <p className="ml-2"> go back</p>
            </div>

            <button
              className=" border border-gray-800 text-gray-800  py-1 px-4 rounded m-4 outline-none"
              type="submit"
              onClick={() => {
                this.props.logoutUser();
              }}
            >
              LOGOUT
            </button>
          </div>

          <div className="mb-2">
            <input
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Name"
              onChange={this.handleChange}
              required
              className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-4xl "
              autoFocus
            />
          </div>

          <div className="mb-2">
            <input
              name="username"
              type="text"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
              required
              className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-2xl "
            />
          </div>

          <div className="mb-2">
            <input
              name="email"
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
              required
              className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-2xl "
            />
          </div>
          <p className="text-xs mx-3 ">
            you are going to login again with your new details*
          </p>

          <div className="flex items-center justify-between">
            <button
              className="w-1/2 flex items-center justify-center border border-teal-600 text-teal-500 h-10  py-2 px-4 rounded m-4"
              type="submit"
            >
              {loading ? (
                <ClipLoader
                  css={override}
                  size={20}
                  color={"#38b2ac"}
                  loading={loading}
                />
              ) : (
                "SAVE"
              )}
            </button>
            <Link
              to="/dashboard"
              className="flex items-center justify-center w-1/2 border border-gray-600 text-gray-500 h-10 py-2 px-4 rounded m-4"
            >
              DISCARD
            </Link>
          </div>

          {err ? (
            <div className="text-center mt-4 text-red-500 text-sm"> {err} </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { editCurrentUser, logoutUser })(
  EditProfile
);
