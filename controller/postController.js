import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer.js'
import auth from '../config/auth.js';
import Post from '../model/Post.js'

const router = express.Router();

router.get("/posts", auth, async (req, res) => {
    const posts = await Post.find();
  
    return res.json(posts);
  });

router.post("/posts", auth, multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

router.delete("/posts/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    await post.remove();
  
    return res.send();
  });

  export default router;