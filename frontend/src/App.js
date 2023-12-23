import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";
import Update from "./components/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/details/:id" element={<BlogDetails />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/profile/:id" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
