import "../App.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function BlogDetails() {
  const navigate = useNavigate();
  const [error, showError] = useState("");
  const { id } = useParams();

  const state = useSelector((state) => state);

  const [post, setPost] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  const fetch = async () => {
    try {
      let response = await axios.get(`http://localhost:8000/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        showError("");
        setPost(await response.data);
      }
    } catch (error) {
      showError("Something went wrong! please try again later");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      let response = await axios.delete(`http://localhost:8000/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        showError("");
        navigate("/");
      }
    } catch (error) {
      showError("Something went wrong! please try again later");
    }
  };

  const url =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <section className="blogSection" id="detailBlog">
      <img src={url} alt="post" className="detailBlogImg" />
      <div className="blogContent">
        <div className="icons">
          <h3>{post?.title}</h3>
          {state?.name === post.username && (
            <div className="icon">
              <MdOutlineDelete onClick={handleDelete} />
              <Link to={`/update/${post?._id}`}>
                <FaRegEdit />
              </Link>
            </div>
          )}
        </div>
        <p>{post?.description}</p>

        <p>Author: {post?.username}</p>
        <Link to="/">Back to Dashboard</Link>
      </div>
    </section>
  );
}
