import { useState } from "react";
import "../App.js";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ post }) {
  const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();
  const url =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  const handleClick = () => {
    navigate(`/details/${post._id}`);
  };

  return (
    <section className="blogSection">
      <img onClick={handleClick} src={url} alt="post" className="blogImg" />
      <div className="blogContent">
        <h3>{addEllipsis(post.title, 20)}</h3>
        <p>{addEllipsis(post.description, 100)}</p>
        {!readMore ? (
          <p className="readMore" onClick={() => setReadMore(!readMore)}>
            Read More
          </p>
        ) : (
          <p onClick={() => setReadMore(!readMore)}>Author: {post.username}</p>
        )}
      </div>
    </section>
  );
}
