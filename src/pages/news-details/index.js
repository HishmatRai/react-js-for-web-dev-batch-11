import React from "react";
import { useLocation } from "react-router-dom";
const NewsDetails = (props) => {
  const routerLocation = useLocation();
  const { title, pDate, url, text } = routerLocation.state;
  return (
    <div>
      <h1>News Details</h1>
      <hr />
      <hr />

      <p>{title}</p>
      <p>{pDate}</p>
      <img src={url} width={"100%"} />
      <p>{text}</p>
    </div>
  );
};
export default NewsDetails;
