import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function SignInForm() {
  const auth = getAuth();
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const signInHandler = () => {
    if (email === "") {
      toast("Email required!", { type: "error" });
    } else if (!email.match(emailValidation)) {
      toast("Please enter valid email", { type: "error" });
    } else if (password === "") {
      toast("Password required!", { type: "error" });
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast("Signed in!", { type: "success" });
          setLoading(false);
          console.log("user", user);
          if(user.emailVerified){
            navigate("/");
          }else{
            navigate("/email-verification");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast(errorMessage, { type: "error" });
          setLoading(false);
        });
    }
  };
  return (
    <div className="form-container sign-in-container">
      {/* <form onSubmit={handleOnSubmit}> */}
      <div className="form">
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FaGoogle />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#">Forgot your password?</a>
        <button onClick={signInHandler} disabled={loading}>
          {loading ? <CircularProgress color="white" size={20} /> : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
