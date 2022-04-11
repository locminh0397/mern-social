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
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ success: false, msg: err.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ success: false, msg: err.message });
  }
};
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await Posts.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ success: false, msg: err.message });
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
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ success: false, msg: err.message });
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
    res.status(200).json(updatedPost);
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await Posts.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.json({ success: false, msg: err.message });
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
    res.json(updatedPost);
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};
