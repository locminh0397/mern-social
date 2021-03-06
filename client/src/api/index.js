import axios from "axios";

const API = axios.create({baseURL: "https://social-mern-api.herokuapp.com/api/v1"})

API.interceptors.request.use(req => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

export const fetchPost = (id) => API.get(`/post/${id}`)
export const fetchPosts = (page) => API.get(`/post?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPostsByCreator = (name) => API.get(`/post/creator?name=${name}`);
export const createPost = (newPost) => API.post(`/post`, newPost)
export const updatePost = (id, newPost) => API.patch(`/post/${id}`, newPost)
export const deletePost = (id ) => API.delete(`/post/${id}`)
export const likePost = (id ) => API.patch(`/post/${id}/likePost`)
export const comment = (value, id) => API.post(`/post/${id}/commentPost`, { value });

export const Login = (formData) => API.post("/auth/login", formData)
export const Register = (formData) => API.post("/auth/register", formData)
