import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";
import "../App.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, showError] = useState("");
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const initialValues = {
    title: "",
    description: "",
    username: state?.name,
  };

  const [formData, setFormData] = useState(initialValues);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = sessionStorage.getItem("accessToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axios.post(
        "http://localhost:8000/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        showError("");
        setFormData(initialValues);

        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      showError("Something went wrong! please try again later");
      setLoading(false);
      console.log(error.message);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <section className="loginSection">
      <div className="box">
        <div>
          <h2 className="blogHeader">Create New Blog</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="title"
            placeholder="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            type="description"
            placeholder="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="username"
            placeholder="Author's Name"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            readOnly
          />

          <button type="submit" className="publishBtn">
            {loading ? <HashLoader size={25} color="#fff" /> : "Publish"}
          </button>
        </form>
      </div>
    </section>
  );
}
