import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "../App.css";

import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, showError] = useState("");

  const [posts, setPosts] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const fetch = async () => {
    setLoading(true);

    try {
      if (token) {
        let response = await axios.get("http://localhost:8000/posts", {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          showError("");
          setPosts(await response.data);
        }
      }
    } catch (error) {
      showError("Something went wrong! please try again later");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const state = useSelector((state) => state);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("login");
  };

  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="container">
      <div className="navBtn">
        <button onClick={() => navigate("/create")} className="submitBtn">
          Create Your Blog
        </button>
        <button
          onClick={() => navigate(`/profile/${state?.id}`)}
          className="submitBtn"
        >
          My Profile
        </button>
        <button onClick={handleLogout} className="submitBtn">
          Logout
        </button>
      </div>
      <h1>Featured Blogs</h1>
      <div className="gridPost">
        {posts?.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
