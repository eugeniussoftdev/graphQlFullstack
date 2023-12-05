import React from "react";

import logo from "../../logo.svg";

import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className="spinner">
      <img src={logo} className="App-logo" alt="logo" width={124} />
    </div>
  );
};
