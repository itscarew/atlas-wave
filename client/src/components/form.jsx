import React from "react";

const FormLayout = ({ children, onSubmit, className, ...otherProps }) => {
  return (
    <form
      {...otherProps}
      onSubmit={onSubmit}
      className={`bg-white rounded px-8 pt-6 pb-8 mb-4" ${className}`}
    >
      {children}
    </form>
  );
};

export default FormLayout;
