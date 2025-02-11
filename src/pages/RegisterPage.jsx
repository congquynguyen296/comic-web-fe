import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Bạn phải đồng ý với điều khoản để đăng ký!");
      return;
    }
    console.log("User Registered:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900">
          Đăng ký Q.comic
        </h1>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
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

          {/* Confirm Password */}
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

          {/* Terms & Conditions */}
          <div className="flex items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="rounded border-gray-300 text-gray-700 focus:ring-gray-400"
              />
              <span>
                Tôi đồng ý với{" "}
                <a href="/terms" className="text-gray-700 hover:underline">
                  điều khoản sử dụng
                </a>
              </span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Đăng ký
          </button>
        </form>

        {/* Already Have an Account */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:underline"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
