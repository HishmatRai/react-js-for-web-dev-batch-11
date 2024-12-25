import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
const Layout = ({ children,show }) => {
    console.log("layout",show)
  return (
    <div style={{marginTop:"100px"}}>
      <Navbar show={show} />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
