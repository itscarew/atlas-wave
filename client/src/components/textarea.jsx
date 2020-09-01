import React from "react";

const TextareaLayout = ({ onChange, value, className, ...otherProps }) => {
  return (
    <textarea
      {...otherProps}
      onChange={onChange}
      value={value}
      className={`appearance-none w-full py-2 px-3 text-2xl leading-tight ${className}`}
    ></textarea>
  );
};

export default TextareaLayout;
