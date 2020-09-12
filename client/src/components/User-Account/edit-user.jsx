import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import FormLayout from "../form";
import Button from "../button";
import InputLayout from "../input";
import CustomClipLoader from "../loader/cliploader";
import CustomLink from "../custom-link";

import { P } from "../text/text";
import { editCurrentUser } from "../../redux/actions/user.actions";
import { logoutUser } from "../../redux/actions/user.actions";

import { GrFormPreviousLink } from "react-icons/gr";

const EditProfile = ({
  logoutUser,
  editCurrentUser,
  auth: {
    user: { username, name, email },
    loading,
  },

  history,
}) => {
  const initialState = { username: "", name: "", email: "" };
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    setUser({ ...user, username: username, name, email });
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editCurrentUser(user);
  };

  return (
    <div className="w-full  mx-auto mt-6">
      <FormLayout onSubmit={onSubmit} className="bg-white ">
        <div className="flex items-center mb-4 cursor-pointer justify-between ">
          <div
            className="flex items-center mb-4 cursor-pointer "
            onClick={() => {
              history.goBack();
            }}
          >
            <GrFormPreviousLink size="1.5rem" />
            <P className="ml-2"> go back</P>
          </div>

          <Button
            signout
            className=" border border-gray-800 text-gray-800  py-1 px-4 rounded m-4 outline-none"
            type="submit"
            onClick={() => {
              logoutUser();
            }}
          >
            LOGOUT
          </Button>
        </div>

        <div className="mb-2">
          <InputLayout
            name="name"
            type="text"
            value={user.name}
            placeholder="Name"
            onChange={handleChange}
            required
            className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-4xl "
            autoFocus
          />
        </div>

        <div className="mb-2">
          <InputLayout
            name="username"
            type="text"
            value={user.username}
            placeholder="Username"
            onChange={handleChange}
            required
            className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-2xl "
          />
        </div>

        <div className="mb-2">
          <InputLayout
            name="email"
            type="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
            required
            className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-2xl "
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            className="w-1/2 flex items-center justify-center border border-teal-600 text-teal-500 h-10  py-2 px-4 rounded m-4"
            type="submit"
          >
            <CustomClipLoader loading={loading} edit>
              {" "}
              SAVE{" "}
            </CustomClipLoader>
          </Button>
          <CustomLink
            to="/home"
            className="flex items-center justify-center w-1/2 border border-gray-600 text-gray-500 h-10 py-2 px-4 rounded m-4"
          >
            DISCARD
          </CustomLink>
        </div>
      </FormLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editCurrentUser, logoutUser })(
  EditProfile
);
