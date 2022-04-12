import React from "react";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const renderPaths = (paths, Element) =>
    paths.map((path) => <Route key={path} path={path} element={Element} />);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          {renderPaths(["/creators/:name", "/tags/:name"], <CreatorOrTag />)}
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate replace to="/posts" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
