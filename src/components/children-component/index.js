import React from "react";
const ChildrenComponent = ({ title, children }) => {
  return (
    <div style={{ backgroundColor: "gray", marginTop: "20px" }}>
      <h1>{title}</h1>

      {children}
    </div>
  );
};
export default ChildrenComponent;
