import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
const EmailVerification = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        if (user.emailVerified) {
          navigate("/");
        }
        console.log("user", user);
      } else {
        navigate("/signin-signup");
      }
    });
  }, []);

  const resendEmailHandler = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast("Email verification sent!!", { type: "success" });
    });
  };
  return (
    <div>
      <h1>Email Verification </h1>
      <p>Email :- {email === "" ? "Loading ..." : email}</p>
      <Button
        variant="contained"
        style={{ marginRight: "15px" }}
        onClick={resendEmailHandler}
      >
        Re-send
      </Button>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Go Home
      </Button>
    </div>
  );
};
export default EmailVerification;
