import React from "react";

export const H1 = ({ children, className }) => (
  <h1 className={`text-6xl ${className}`}> {children} </h1>
);
export const H2 = ({ children, className }) => (
  <h2 className={`text-5xl ${className}`}> {children} </h2>
);
export const H3 = ({ children, className }) => (
  <h3 className={`text-4xl ${className}`}> {children} </h3>
);
export const H4 = ({ children, className }) => (
  <h4 className={`text-3xl ${className}`}> {children} </h4>
);
export const H5 = ({ children, className }) => (
  <h5 className={`text-2xl ${className}`}> {children} </h5>
);
export const H6 = ({ children, className }) => (
  <h6 className={`text-xl ${className}`}> {children} </h6>
);
export const H7 = ({ children, className }) => (
  <small className={`text-sm ${className}`}> {children} </small>
);
export const H8 = ({ children, className }) => (
  <small className={`text-xs ${className}`}> {children} </small>
);

export const P = ({ children, className, onClick }) => (
  <p onClick={onClick} className={`text-base ${className}`}>
    {" "}
    {children}{" "}
  </p>
);
