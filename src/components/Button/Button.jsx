import React from "react";
import "./Button.scss";

export const Button = ({ children, onClick, type}) => {
  return <button className={type === "delete" ? "button button--delete"
      : type == "close" ? "button button--close"
          : "button"} type={"submit"} onClick={onClick}>{children}</button>;
};

