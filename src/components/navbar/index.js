import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <hr />
      <hr />
      {props.show && (
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQHmHI3WxeTzyg/company-logo_200_200/company-logo_200_200/0/1630641231718?e=2147483647&v=beta&t=euRQMqbys4WgMfE7o76lm85kewVne8B3fUBT0xeid3I"
          height={50}
        />
      )}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <hr />
      <hr />

      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/about")}>About</button>
      <button onClick={() => navigate("/contact")}>Contact</button>
    </div>
  );
};
export default Navbar;
