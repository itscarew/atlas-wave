import React from "react";
import MainLayout from "../layouts/main-layout";
import CustomLink from "../components/custom-link";
import { H4 } from "../components/text/text";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className=" flex flex-col justify-center items-center mt-4">
        <H4 className="font-semibold  my-8">
          Err. This page you are trying to access does not exist{" "}
        </H4>
        <CustomLink
          className="flex justify-center bg-teal-500 hover:bg-teal-600 text-white py-4 px-12 rounded my-4"
          to="/home"
        >
          Go Back
        </CustomLink>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
