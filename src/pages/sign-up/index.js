// import React, { useState } from "react";
// const SignUp = () => {
//   const [fullName, setFullName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const emailValidation =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const passwordValidation =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
//   const signUpHandler = () => {
//     setMessageType("error");
//     if (fullName === "") {
//       setMessage("Full name required!");
//     } else if (phoneNumber === "") {
//       setMessage("Phone number required!");
//     } else if (phoneNumber.length !== 11) {
//       setMessage("Please enter valid phone number");
//     } else if (email === "") {
//       setMessage("Email required!");
//     } else if (!email.match(emailValidation)) {
//       setMessage("Please enter valid email");
//     } else if (password === "") {
//       setMessage("Password required!");
//     } else if (!password.match(passwordValidation)) {
//       setMessage("Please enter valid password");
//     } else {
//       setMessageType("success");
//       setMessage("Success!");
//       const user = {
//         fullName: fullName,
//         email: email,
//         phoneNumber: phoneNumber,
//         password: password,
//       };
//       console.log("User :- ", user);
//       setFullName("");
//       setPhoneNumber("");
//       setEmail("");
//       setPassword("");
//       setTimeout(() => {
//         setMessage("");
//       }, 2000);
//     }
//   };
//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Email Address"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <p>
//         Min 1 uppercase letter.
//         <br />
//         Min 1 lowercase letter.
//         <br />
//         Min 1 special character.
//         <br />
//         Min 1 number.
//         <br />
//         Min 8 characters.
//         <br />
//         Max 30 characters.
//       </p>
//       <p style={{ color: messageType === "error" ? "red" : "green" }}>
//         {message}
//       </p>
//       <button onClick={signUpHandler}>Sign Up</button>
//     </div>
//   );
// };
// export default SignUp;

import React, { useState } from "react";
import { Button } from "../../components";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "./../../config/firebase";
const SignUp = () => {
  const auth = getAuth();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  const signUpHandler = () => {
    setMessageType("error");
    if (form.fullName === "") {
      setMessage("Full name required!");
    } else if (form.phoneNumber === "") {
      setMessage("Phone number required!");
    } else if (form.phoneNumber.length !== 11) {
      setMessage("Please enter valid phone number");
    } else if (form.email === "") {
      setMessage("Email required!");
    } else if (!form.email.match(emailValidation)) {
      setMessage("Please enter valid email");
    } else if (form.password === "") {
      setMessage("Password required!");
    } else if (!form.password.match(passwordValidation)) {
      setMessage("Please enter valid password");
    } else {
      setMessageType("success");
      setMessage("Success!");
      const user = {
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      };
      console.log("User :- ", user);
      setForm({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />
      <input
        type="number"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
      <button onClick={() => setShowPassword(!showPassword)}>
        {!showPassword ? (
          <IoEye color="red" size={50} />
        ) : (
          <IoIosEyeOff color="red" size={50} />
        )}
      </button>
      <p>
        Min 1 uppercase letter.
        <br />
        Min 1 lowercase letter.
        <br />
        Min 1 special character.
        <br />
        Min 1 number.
        <br />
        Min 8 characters.
        <br />
        Max 30 characters.
      </p>
      <p style={{ color: messageType === "error" ? "red" : "green" }}>
        {message}
      </p>
      <button onClick={() => console.log("form", form.fullName)}>Click</button>
      <button onClick={signUpHandler}>Sign Up</button>
      <hr />
      <Button title="Click" bgColor="blue" border={true} />
      <Button title="Sign Up" onClick={signUpHandler} />
      <Button title="Sign In" border={true} />
      <Button title="Log Out" border={true} />
      <Button title="Update" bgColor="red" onClick={() => alert("Update")} />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <button
        onClick={() => {
          createUserWithEmailAndPassword(auth, "emffdail@gmail.com", "password")
            .then((userCredential) => {
              // Signed up
              const user = userCredential.user;
              // ...
              console.log("user----->", user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              console.log("message ------> ", errorMessage);
            });
        }}
      >
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
