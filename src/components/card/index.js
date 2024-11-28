import React from "react";
import "./index.css";
const Card = ({ icon, title, text }) => {
  return (
    <div className="card">
      <img src={icon} />
      <h6>{title}</h6>
      <p>{text}</p>
    </div>
  );
};
export default Card;
