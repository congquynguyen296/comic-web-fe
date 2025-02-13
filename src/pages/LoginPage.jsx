import React, { useState, useEffect } from "react";
import { Google, Facebook } from "@mui/icons-material";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Xử lý form đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/nettruyen/api/auth/login",
        { username, password }
      );

      if (response.status === 200 && response.data.result) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.result.token);

        // Chuyển hướng đến trang chủ
        navigate("/home-page");
      } else {
        setErrorMessage("Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu.");
      } else {
        setErrorMessage("Lỗi hệ thống, vui lòng thử lại sau!");
      }
    }
  };

  // Ẩn alert sau 3 giây
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900">
          Q.comic
        </h1>

        {/* Hiển thị alert nếu có lỗi */}
        {errorMessage && (
          <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-800" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 6a1 1 0 012 0v4a1 1 0 01-2 0V6zm1 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none bg-gray-100"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-gray-400 focus:outline-none bg-gray-100"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 p-1 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Remember Me & Sign Up */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            {/* Remember Me Checkbox */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded border-gray-300 text-gray-700 focus:ring-gray-400"
              />
              <span>Ghi nhớ tôi</span>
            </label>

            {/* Chuyển sang trang đăng ký */}
            <button
              type="button" // Thêm vào để tránh gọi bị gọi lại api login khi chuyển sang register
              onClick={() => navigate("/register")}
              className="text-gray-700 hover:underline"
            >
              Đăng ký tài khoản với Q.comic
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Đăng nhập
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">Hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-200 transition">
            <Google className="!w-6 !h-6 text-gray-700" />
          </button>
          <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-200 transition">
            <Facebook className="!w-6 !h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
