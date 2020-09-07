import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import FormLayout from "../components/form";
import InputLayout from "../components/input";
import ViewPassword from "../components/view-password";
import CustomClipLoader from "../components/loader/cliploader";
import ErrorMessage from "../components/error-message";

import Button from "../components/button";
import { P } from "../components/text/text";

import { clearError } from "../redux/actions/user.actions";
import { setViewPassword } from "../redux/actions/viewPassword.actions";

//react-icons
import { GrFormPreviousLink } from "react-icons/gr";

const Signup = ({
  history,
  registerAdmin,
  setViewPassword,
  clearError,
  viewPassword: { status },
  auth: { loading },
  error: { err },
}) => {
  const role = "admin";
  const initialState = {
    username: "",
    name: "",
    email: "",
    password: "",
    role,
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    registerAdmin(user, history);
  };

  useEffect(() => {
    clearError();
  }, [clearError, history]);

  const { username, name, email, password } = user;
  return (
    <div className="max-w-lg mx-auto my-12  ">
      <FormLayout onSubmit={onSubmit} className="bg-white shadow rounded ">
        <div
          className="flex items-center mb-4 cursor-pointer "
          onClick={() => {
            history.goBack();
          }}
        >
          <GrFormPreviousLink size="1.5rem" />
          <P className="ml-2"> go back</P>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2">Username</label>
          <InputLayout
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            className="shadow-sm text-gray-700  border rounded-sm   focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2">Name</label>
          <InputLayout
            name="name"
            type="text"
            value={name}
            placeholder="Name"
            onChange={handleChange}
            className="shadow-sm  text-gray-700  border rounded-sm   focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2">
            Email Address
          </label>
          <InputLayout
            name="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            className="shadow-sm text-gray-700  border rounded-sm   focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2">Password</label>

          <div className="flex items-center">
            <InputLayout
              name="password"
              type={status ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={handleChange}
              className="shadow-sm  text-gray-700  border rounded-sm   focus:outline-none focus:shadow-outline"
            />

            <ViewPassword onClick={setViewPassword} status={status} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-teal-500 hover:bg-gray-900 w-full text-white"
          >
            <CustomClipLoader loading={loading}> Create Admin</CustomClipLoader>
          </Button>
        </div>

        <ErrorMessage err={err} />
      </FormLayout>{" "}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  viewPassword: state.viewPassword,
});

export default connect(mapStateToProps, {
  setViewPassword,
  clearError,
})(Signup);
