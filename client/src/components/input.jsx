import React from "react";

const InputLayout = ({ onChange, value, className, ...otherProps }) => {
  return (
    <input
      {...otherProps}
      onChange={onChange}
      value={value}
      className={` w-full py-2 px-3 leading-tight ${className}`}
    />
  );
};

export default InputLayout;
