import React from "react";
import { NavLink } from "react-router-dom";

const CustomLink = ({
  to,
  children,
  className,
  activeClassName,
  ...otherProps
}) => {
  return (
    <NavLink
      {...otherProps}
      to={to}
      className={className}
      activeClassName={activeClassName}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
