import React, { Component } from "react";
import { connect } from "react-redux";

import { editCurrentUserPassword } from "../../redux/actions/user.actions";
import { setViewPassword } from "../../redux/actions/viewPassword.actions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

class EditProfilePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editCurrentUserPassword(this.state);
  };

  viewPassword = () => {
    this.props.setViewPassword();
  };

  render() {
    const override = css`
      display: block;
      margin: 8rem auto;
    `;
    const { loading } = this.props.auth;
    const { status } = this.props.viewPassword;

    return (
      <div className="w-full mx-auto mt-6">
        <form onSubmit={this.onSubmit} className="bg-white px-8 pt-6 pb-4 mb-2">
          <div className=" flex items-center mb-4">
            <input
              name="password"
              type={status ? "text" : "password"}
              value={this.state.password}
              placeholder="Type in your new Password"
              onChange={this.handleChange}
              required
              className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-2xl"
            />
            <div className="cursor-pointer" onClick={this.viewPassword}>
              {status ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <p className="text-xs mx-3 ">
            you are going to login again with this new password*
          </p>
          <div className="flex items-center justify-between">
            <button
              className="w-full flex items-center justify-center border border-teal-600 text-teal-500 h-10  py-2 px-4 rounded m-4"
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
                " SAVE PASSW0RD"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  viewPassword: state.viewPassword,
});

export default connect(mapStateToProps, {
  editCurrentUserPassword,
  setViewPassword,
})(EditProfilePassword);
