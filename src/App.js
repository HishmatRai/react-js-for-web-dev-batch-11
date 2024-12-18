import React from "react";
import "./App.css";
import Router from "./config/router";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  );
};
export default App;
