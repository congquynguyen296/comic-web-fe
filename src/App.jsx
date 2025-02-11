import React from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryDetailPage from "./pages/StoryDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


export default function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Bao bọc ứng dụng với BrowserRouter */}
      <Routes>
        {" "}

        {/* Điều hướng mặc định */}
        <Route path="/" element={<Navigate to="/home-page" replace />} />

        {/* Sử dụng Routes để định nghĩa các route */}

        <Route path="/home-page" element={<HomePage />} />

        <Route path="/story/:id" element={<StoryDetailPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
