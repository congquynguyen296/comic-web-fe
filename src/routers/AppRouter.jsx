import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StoryDetailPage from "../pages/StoryDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";
import StoryContent from "../features/story/StoryContent";
import AuthenticatePage from "../pages/AuthenticationPage";

export default function AppRouter() {
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
        <Route path="/story/:code" element={<StoryDetailPage />} />
        <Route
          path="/story/:storyCode/:chapterNumber"
          element={<StoryContent />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/confirm-otp" element={<ConfirmEmailPage />} />
        <Route path="/authentication" element={<AuthenticatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
