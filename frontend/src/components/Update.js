import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";
import "../App.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("accessToken");
  const [error, showError] = useState("");
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const fetch = async () => {
    let response = await axios.get(`http://localhost:8000/post/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    if (response.status === 200) {
      showError("");
      setFormData(response.data);
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axios.put(
        `http://localhost:8000/update/${id}`,
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

        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      showError("Something went wrong! please try again later");
      setLoading(false);
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
            type="text"
            placeholder="Content"
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
            {loading ? <HashLoader size={25} color="#fff" /> : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
}
