import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import "./index.css";
import Grid from "@mui/material/Grid";
const Layout = ({ children, show }) => {
  return (
    <div className="layout-container">
      <Navbar show={show} />
      <Grid container spacing={0}>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <div className="layout-children">{children}</div>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      </Grid>

      <Footer />
    </div>
  );
};
export default Layout;
