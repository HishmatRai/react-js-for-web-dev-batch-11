import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { signUpWithFacebook, signUpWithGoogle } from "./social-login";
function SignInForm() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          if (user.emailVerified) {
            navigate("/");
          } else {
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
          <a href="#" className="social" onClick={signUpWithFacebook}>
            <FaFacebookF />
          </a>
          <a href="#" className="social" onClick={signUpWithGoogle}>
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
        <a href="#" onClick={handleClickOpen}>
          Forgot your password?
        </a>
        <button onClick={signInHandler} disabled={loading}>
          {loading ? <CircularProgress color="white" size={20} /> : "Sign In"}
        </button>
        <React.Fragment>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                sendPasswordResetEmail(auth, email)
                  .then(() => {
                    toast("Password reset email sent!", { type: "success" });
                    handleClose();
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    toast(errorMessage, { type: "error" });
                  });
              },
            }}
          >
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Forgot Password?</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </div>
  );
}

export default SignInForm;
