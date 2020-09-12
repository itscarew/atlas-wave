import React from "react";
import { H5 } from "../components/text/text";
import { AiOutlineWarning } from "react-icons/ai";

const ErrorMessage = ({ err }) => {
  return (
    <>
      {err && (
        <div className="flex items-center text-center mt-4 bg-red-600 text-sm fixed rounded-md py-4 px-8 m-5 top-0 right-0">
          <AiOutlineWarning className="mr-1" fill="#fff" size="1.2rem" />{" "}
          <H5 className="text-white"> {err} </H5>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
