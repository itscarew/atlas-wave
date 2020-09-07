import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import FormLayout from "../components/form";
import InputLayout from "../components/input";
import ViewPassword from "../components/view-password";
import Button from "../components/button";
import CustomClipLoader from "../components/loader/cliploader";

import { clearError } from "../redux/actions/user.actions";
import { setViewPassword } from "../redux/actions/viewPassword.actions";

//react-icons
import { GrFormPreviousLink } from "react-icons/gr";
import ErrorMessage from "../components/error-message";

const Signin = ({
  history,
  loginAdmin,
  setViewPassword,
  clearError,
  viewPassword: { status },
  auth: { loading },
  error: { err },
}) => {
  const initialState = { email: "", password: "" };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    loginAdmin(user, history);
    e.preventDefault();
  };

  useEffect(() => {
    clearError();
  }, [clearError, history]);

  const { email, password } = user;
  return (
    <div className="w-full max-w-lg mx-auto my-12">
      <FormLayout onSubmit={onSubmit} className="bg-white shadow rounded ">
        <div
          className="flex items-center mb-4 cursor-pointer "
          onClick={() => {
            history.goBack();
          }}
        >
          <GrFormPreviousLink size="1.5rem" />
          <p className="ml-2"> go back</p>
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
            className="shadow-sm  text-gray-700 border rounded-sm  focus:outline-none focus:shadow-outline"
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
              className="shadow-sm  text-gray-700  border rounded-sm  focus:outline-none focus:shadow-outline"
            />

            <ViewPassword onClick={setViewPassword} status={status} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-teal-500 hover:bg-gray-900 w-full text-white"
          >
            <CustomClipLoader loading={loading}> Sign In</CustomClipLoader>
          </Button>
        </div>

        <ErrorMessage err={err} />
      </FormLayout>
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
})(Signin);
