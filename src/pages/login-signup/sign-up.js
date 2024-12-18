import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

function SignUpForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnSubmit = (evt) => {
    console.log(formData);
    return false;
  };
  const notify = () => toast("Full Name required!", { type: "success" });
  return (
    <div className="form-container sign-up-container">
      <button onClick={notify}>Notify!</button>
      <form
        onSubmit={() => {
          handleOnSubmit();
          return false;
        }}
      >
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FaGoogle />
          </a>
        </div>
        <span>or use your email for registration</span>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
