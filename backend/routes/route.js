import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controller/post-controller.js";
import { loginUser, singupUser } from "../controller/user-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", singupUser);

router.post("/create", authenticateToken, createPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

router.get("/post/:id", authenticateToken, getPost);
router.get("/posts", authenticateToken, getAllPosts);

export default router;
