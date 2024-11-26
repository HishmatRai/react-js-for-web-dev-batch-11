// import React from "react";
// import "./index.css";
// const Button = (props) => {
//   console.log("button props :- ", props);
//   return (
//     <div>
//       <button
//         className="button"
//         style={{
//           backgroundColor: props.bgColor ? props.bgColor : "yellow",
//           border: "solid red",
//           borderWidth: props.border ? 5 : 0,
//           // border:"3px solid red"
//           //   border: `${props.border ? 3 : 0} dotted blue`,
//         }}
//         onClick={props.onClick}
//       >
//         {props.title}
//       </button>
//     </div>
//   );
// };
// export default Button;

import React from "react";
import "./index.css";
const Button = ({ title, bgColor, border, onClick }) => {
  return (
    <div>
      <button
        className="button"
        style={{
          backgroundColor: bgColor ? bgColor : "yellow",
          border: "solid red",
          borderWidth: border ? 5 : 0,
          // border:"3px solid red"
          //   border: `${props.border ? 3 : 0} dotted blue`,
        }}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};
export default Button;
