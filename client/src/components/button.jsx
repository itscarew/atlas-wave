import React from "react";

const Button = ({
  children,
  className,
  onClick,
  comment,
  signout,
  ...otherProps
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      {...otherProps}
      className={`flex items-center justify-center py-2 px-4 h-10 rounded focus:outline-none focus:shadow-outline ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
