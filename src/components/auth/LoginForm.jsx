import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleSubmit,
  navigate,
}) => {
  return (
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
          type="button"
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
  );
};

export default LoginForm;