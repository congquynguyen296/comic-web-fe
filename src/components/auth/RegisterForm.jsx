import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const RegisterForm = ({
  formData,
  handleChange,
  handleRegister,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleRegister} className="space-y-5">
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

      {/* Terms Checkbox */}
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

      {/* Submit Button */}
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
  );
};

export default RegisterForm;