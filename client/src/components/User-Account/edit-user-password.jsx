import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "../button";
import CustomClipLoader from "../loader/cliploader";
import InputLayout from "../input";
import { H8 } from "../text/text";
import FormLayout from "../form";
import ViewPasswordEye from "../view-password";
import ErrorMessage from "../error-message";

import {
  editCurrentUserPassword,
  clearError,
} from "../../redux/actions/user.actions";
import { setViewPassword } from "../../redux/actions/viewPassword.actions";

const EditProfilePassword = ({
  clearError,
  editCurrentUserPassword,
  setViewPassword,
  viewPassword: { status },
  error: { err },
  auth: { loading },
}) => {
  const [password, setPassword] = useState({ password: "" });

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editCurrentUserPassword(password);
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <div className="w-full mx-auto mt-6">
      <FormLayout onSubmit={onSubmit} className="bg-white">
        <div className=" flex items-center mb-4">
          <InputLayout
            name="password"
            type={status ? "text" : "password"}
            value={password.password}
            placeholder="Type in your new Password"
            onChange={handleChange}
            required
            className="appearance-none outline-none  w-full py-2 px-3 text-gray-900 leading-tight text-2xl"
          />

          <ViewPasswordEye onClick={setViewPassword} status={status} />
        </div>
        <H8 className="mx-3 ">
          you are going to login again with this new password*
        </H8>
        <ErrorMessage err={err} />

        <div className="flex items-center justify-between">
          <Button
            className="border w-full my-4 border-teal-600 text-teal-500"
            type="submit"
          >
            <CustomClipLoader loading={loading} edit>
              {" "}
              SAVE PASSWORD
            </CustomClipLoader>
          </Button>
        </div>
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
  editCurrentUserPassword,
  setViewPassword,
  clearError,
})(EditProfilePassword);
