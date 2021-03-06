import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import MainLayout from "../../layouts/main-layout";
import FormLayout from "../../components/form";
import InputLayout from "../../components/input";
import ViewPassword from "../../components/view-password";
import CustomClipLoader from "../../components/loader/cliploader";

import CustomLink from "../../components/custom-link";
import Button from "../../components/button";
import { P } from "../../components/text/text";

import { registerUser } from "../../redux/actions/user.actions";
import { setViewPassword } from "../../redux/actions/viewPassword.actions";

//react-icons
import { GrFormPreviousLink } from "react-icons/gr";

const SignupPage = ({
  history,
  registerUser,
  setViewPassword,

  viewPassword: { status },
  auth: { loading, isAuthenticated },
}) => {
  const initialState = { username: "", name: "", email: "", password: "" };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(user, history);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      history.push("/home");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  const { username, name, email, password } = user;
  return (
    <MainLayout>
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
            <label className="block text-gray-700 text-sm  mb-2">
              Username
            </label>
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
            <label className="block text-gray-700 text-sm  mb-2">
              Password
            </label>

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
              <CustomClipLoader loading={loading}> Sign Up</CustomClipLoader>
            </Button>
          </div>

          <P className="mt-4 text-center">
            Already have an account ?
            <CustomLink className="text-teal-500" to="/signin">
              {" "}
              Sign In.
            </CustomLink>
          </P>
        </FormLayout>{" "}
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  viewPassword: state.viewPassword,
});

export default connect(mapStateToProps, {
  registerUser,
  setViewPassword,
})(SignupPage);
