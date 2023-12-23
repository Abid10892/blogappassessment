import React, { useEffect, useState } from "react";
import "../App.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyProfile({}) {
  const [error, showError] = useState("");
  const [posts, setPosts] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  const state = useSelector((state) => state);

  const fetch = async () => {
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
          setPosts(response.data);
        }
      }
    } catch (error) {
      showError("Something went wrong! please try again later");
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <section className="profileSection">
      <div className="box">
        <div>
          <h2>Your Profile</h2>
        </div>
        <div className="profile">
          <h5>{state?.name}</h5>
          <p>{state?.username}</p>
        </div>
        <div className="postLength">
          <p>Number of Posts</p>
          <p>
            {posts
              ? posts?.filter((post) => post?.username === state?.name).length
              : "0"}
          </p>
        </div>
        <Link to="/">Back to Dashboard</Link>
      </div>
    </section>
  );
}
