import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAuthMessage from "../components/message/ErrorAuthMessage";
import LoginForm from "../components/auth/LoginForm";
import GoogleLogin from "../components/auth/GoogleLogin";
import FacebookLogin from "../components/auth/FacebookLogin";
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
        localStorage.setItem("token", response.data.result.token);
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
        {errorMessage && <ErrorAuthMessage errorMessage={errorMessage} />}

        {/* Login Form */}
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleSubmit={handleSubmit}
          navigate={navigate}
        />

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">Hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <GoogleLogin />
          <FacebookLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;