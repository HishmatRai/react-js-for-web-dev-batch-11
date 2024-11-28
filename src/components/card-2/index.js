import React from "react";
const Card2 = ({ data }) => {
  return (
    <div className="card-container">
      {data.map((val, index) => {
        return (
          <div className="card" key={index}>
            <img src={val.icon} />
            <h6>{val.title}</h6>
            <p>{val.text}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Card2;
