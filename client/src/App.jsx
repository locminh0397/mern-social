import React from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
  );
}

export default App;
