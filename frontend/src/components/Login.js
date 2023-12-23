import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";
import "../App.js";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, showError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loginInitialValues = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(loginInitialValues);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = sessionStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axios.post("http://localhost:8000/login", formData);
      if (response.status === 200) {
        showError("");
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            name: await response.data.name,
            username: await response.data.username,
            id: await response.data.id,
          },
        });
        setFormData(loginInitialValues);
        navigate("/");
        setLoading(false);
      } else if (response.status >= 200 && response.status <= 400) {
        setLoading(false);
        showError(response.data.msg);
      }
    } catch (error) {
      showError("Invalid Credentials");
      setLoading(false);
    }
  };

  if (token) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return (
    <section className="loginSection">
      <div className="box">
        <div>
          <h2>Sign In</h2>
          <h5>Welcome back to the community!</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            placeholder="Enter Your email"
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
          <div className="forgotPassword">
            <div className="checkbox">
              <input type="checkbox" />
              <p>RememberMe</p>
            </div>
            <a href="/register" className="text-primaryColor">
              Forgot password?
            </a>
          </div>
          <div className="error">{error ? error : ""}</div>
          <button type="submit" className="submitBtn">
            {loading ? <HashLoader size={25} color="#fff" /> : "Sign In"}
          </button>

          <p className="register">
            Don&apos;t have an account ?{" "}
            <a href="/register" className="text-primaryColor">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
