import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";
import "../App.js";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, showError] = useState("");
  const token = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();
  const signupInitialValues = {
    name: "",
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(signupInitialValues);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await axios.post("http://localhost:8000/signup", formData);
    if (response.status === 200) {
      showError("");
      setFormData(signupInitialValues);

      navigate("/login");
      setLoading(false);
    } else {
      showError("Something went wrong! please try again later");
      setLoading(false);
    }
  };

  if (token) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <section className="loginSection">
      <div className="box">
        <div>
          <h2>Register Here</h2>
          <h5>Welcome to the community!</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Enter Your Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="username"
            placeholder="Enter Your Email"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <p>{error ? error : ""}</p>
          <button type="submit" className="submitBtn">
            {loading ? <HashLoader size={25} color="#fff" /> : "Register"}
          </button>

          <p className="register">
            Already have an account ?{" "}
            <a href="/login" className="text-primaryColor">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
