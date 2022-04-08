import mongoose from "mongoose";
import Posts from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ success: false, msg: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Posts(post);
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
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const post = await Posts.findById(id);
    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};
