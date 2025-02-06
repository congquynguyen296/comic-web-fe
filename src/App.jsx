import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StoryDetailPage from "./pages/StoryDetailPage";


export default function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Bao bọc ứng dụng với BrowserRouter */}
      <Routes>
        {" "}
        {/* Sử dụng Routes để định nghĩa các route */}
        {/* Định nghĩa route cho trang chủ */}
        <Route path="/" element={<HomePage />} />
        {/* Định nghĩa route cho trang chi tiết truyện */}
        <Route path="/story/:id" element={<StoryDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
