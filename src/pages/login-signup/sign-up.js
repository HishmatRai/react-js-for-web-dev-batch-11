import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { signUpWithFacebook, signUpWithGoogle } from "./social-login";
function SignUpForm() {
  const auth = getAuth();
  const database = getDatabase();
  const firestore = getFirestore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleOnSubmit = async (evt) => {
    if (formData.name === "") {
      toast("Full Name required!", { type: "error" });
    } else if (formData.email === "") {
      toast("Email required!", { type: "error" });
    } else if (!formData.email.match(emailValidation)) {
      toast("Please enter valid email", { type: "error" });
    } else if (formData.password === "") {
      toast("Password required!", { type: "error" });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser).then(async () => {
            set(ref(database, "users/" + user.uid), {
              name: formData.name,
              email: formData.email,
            });
            await setDoc(doc(firestore, "users", user.uid), {
              name: formData.name,
              email: formData.email,
            });
            toast("Success!", { type: "success" });
            console.log("user", user);
            setLoading(false);
            navigate("/email-verification");
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast(errorMessage, { type: "error" });
          console.log("errorMessage", errorMessage);
          setLoading(false);
        });
    }
  };
  // const notify = () => toast("Full Name required!", { type: "success" });
  return (
    <div className="form-container sign-up-container">
      {/* <button onClick={notify}>Notify!</button> */}
      {/* <form
        onSubmit={() => {
          handleOnSubmit();
          return false;
        }}
      > */}
      <div className="form">
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social" onClick={signUpWithFacebook}>
            <FaFacebookF />
          </a>
          <a href="#" className="social" onClick={signUpWithGoogle}>
            <FaGoogle />
          </a>
        </div>
        <span>or use your email for registration</span>

        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />
        <button onClick={handleOnSubmit}>
          {loading ? <CircularProgress color="white" size={20} /> : "Sign Up"}
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default SignUpForm;
