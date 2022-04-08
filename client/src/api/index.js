import axios from "axios";

const url = "http://localhost:3001/api/v1"

export const fetchPosts = () => axios.get(`${url}/post`)
export const createPost = (newPost) => axios.post(`${url}/post`, newPost)
export const updatePost = (id, newPost) => axios.patch(`${url}/post/${id}`, newPost)
export const deletePost = (id ) => axios.delete(`${url}/post/${id}`)
export const likePost = (id ) => axios.patch(`${url}/post/${id}/likePost`)
