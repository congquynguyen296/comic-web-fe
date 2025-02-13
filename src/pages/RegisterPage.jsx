import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAuthMessage from "../components/message/ErrorAuthMessage";
import SuccessAuthMessage from "../components/message/SuccessAuthMessage";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setErrorMessage("Bạn phải đồng ý với điều khoản để đăng ký!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    setIsSubmitting(true); // Bật trạng thái loading khi ấn đăng ký để tránh delay

    try {
      const response = await axios.post(
        "http://localhost:8080/nettruyen/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.result.id !== null) {
        console.log(response);
        navigate(
          `/register/confirm-otp?token=${response.data.result.id}&email=${formData.email}`
        );
      } else {
        setErrorMessage("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full">
        {/* Error Message */}
        {errorMessage && <ErrorAuthMessage errorMessage={errorMessage} />}
        {/* Success Message */}
        {successMessage && <SuccessAuthMessage successMessage={successMessage} />}
        <>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900">
            Đăng ký Q.comic
          </h1>
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Các trường nhập liệu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-400"
                placeholder="Nhập username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-400"
                placeholder="Nhập email"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md pr-10 bg-gray-100 focus:ring-2 focus:ring-gray-400"
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

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md pr-10 bg-gray-100 focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-3 p-1 text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="rounded border-gray-300 text-gray-700 focus:ring-gray-400"
              />
              <span className="text-sm text-gray-600">
                Tôi đồng ý với các điều khoản
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-900 transition flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default RegisterPage;
