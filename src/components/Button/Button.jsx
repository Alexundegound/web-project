import React from "react";
import "./Button.scss";

export const Button = ({ children }) => {
  return <button className="button" type="submit">{children}</button>;
};

