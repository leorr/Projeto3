import express from 'express';
const multer = require("multer");
const multerConfig = require("./config/multer");
import auth from '../config/auth.js';
import Post from '../model/Post'

const router = express.Router();

routes.get("/posts", auth, async (req, res) => {
    const posts = await Post.find();
  
    return res.json(posts);
  });

routes.post("/posts", auth, multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

routes.delete("/posts/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    await post.remove();
  
    return res.send();
  });

  export default router;