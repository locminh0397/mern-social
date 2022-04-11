import mongoose from "mongoose";
import Posts from "../models/postModel.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Posts.countDocuments({});
    const posts = await Posts.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    return res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    return res.status(404).json({ success: false, msg: err.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ success: false, msg: err.message });
  }
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try { 
    const title = new RegExp(searchQuery, "i");

    const posts = await Posts.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

    return res.json({ data: posts });
  } catch (err) {
    return res.status(404).json({ success: false, msg: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Posts({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(409).json({ success: false, msg: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with id");

    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };
    await Posts.findByIdAndUpdate(id, updatedPost, { new: true });
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await Posts.findByIdAndRemove(id);

    return res.json({ message: "Post deleted successfully." });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) return res.json({ msg: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const post = await Posts.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
    return res.json(updatedPost);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

export const commentPost = async (req,res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const post = await Posts.findById(id);

    post.comments.push(value);
  
    const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
  
    res.json(updatedPost);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
}
export const getPostsByCreator = async (req, res) => {
  const { name } = req.query;

  try {
      const posts = await Posts.find({ name });

      res.json({ data: posts });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}