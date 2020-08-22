import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center mt-4">
      <p className="font-semibold text-3xl my-8">
        Err. This page you are trying to access does not exist{" "}
      </p>
      <Link
        className="flex justify-center bg-teal-500 hover:bg-teal-600 text-white py-4 px-12 rounded my-4"
        to="/dashboard"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFoundPage;
