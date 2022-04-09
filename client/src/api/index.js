import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3001/api/v1"})

API.interceptors.request.use(req => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

export const fetchPosts = () => API.get(`/post`)
export const createPost = (newPost) => API.post(`/post`, newPost)
export const updatePost = (id, newPost) => API.patch(`/post/${id}`, newPost)
export const deletePost = (id ) => API.delete(`/post/${id}`)
export const likePost = (id ) => API.patch(`/post/${id}/likePost`)

export const Login = (formData) => API.post("/auth/login", formData)
export const Register = (formData) => API.post("/auth/register", formData)
