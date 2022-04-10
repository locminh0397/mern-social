import React from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user? <Auth />: <Navigate replace to="/posts"/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
