import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOTPScreen, setIsOTPScreen] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(600);
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
    let countdown;
    if (isOTPScreen && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [isOTPScreen, timer]);

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

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép nhập số
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Tự động chuyển focus đến ô tiếp theo nếu có giá trị
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
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

    setIsSubmitting(true);  // Bật trạng thái loading khi ấn đăng ký để tránh delay

    try {
      const response = await axios.post(
        "http://localhost:8080/nettruyen/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.result.id !== null) {
        setIsOTPScreen(true);
        setSuccessMessage("Mã OTP đã được gửi đến email của bạn!");
      } else {
        setErrorMessage("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (otpCode) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/nettruyen/auth/active-account",
        {
          email: formData.email,
          otpCode: otpCode,
        }
      );

      console.log(response.data);

      if (response.data.result.isActive === 1) {
        setSuccessMessage("Tài khoản đã kích hoạt! Đang chuyển hướng...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrorMessage("Mã OTP không hợp lệ!");
        setOTP(["", "", "", "", "", ""]);
      }
    } catch (error) {
      setErrorMessage("Lỗi khi xác thực OTP!");
    }
    setIsSubmitting(false);
  };

  const handleResendOTP = async () => {
    setIsResendingOTP(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/nettruyen/auth/resend-otp",
        {
          email: formData.email,
        }
      );

      if (response.data.success) {
        setSuccessMessage("Mã OTP mới đã được gửi đến email của bạn!");
        setTimer(600); // Reset timer về 10 phút
        setOTP(["", "", "", "", "", ""]); // Reset OTP input
      } else {
        setErrorMessage("Gửi lại OTP thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      setErrorMessage("Lỗi khi gửi lại OTP. Vui lòng thử lại sau!");
    }
    setIsResendingOTP(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full">
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded-lg flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-red-800"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 6a1 1 0 012 0v4a1 1 0 01-2 0V6zm1 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 border border-green-400 rounded-lg flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-800"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </div>
        )}

        {!isOTPScreen ? (
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
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center mb-4 text-gray-900">
              Nhập mã OTP
            </h1>
            <p className="text-center text-gray-600 mb-4">
              Mã OTP đã được gửi đến email của bạn. Hết hạn sau{" "}
              <span className="text-red-500 font-bold">
                {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
              </span>
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-gray-400"
                  maxLength={1}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digit && index > 0) {
                      const prevInput = document.getElementById(
                        `otp-input-${index - 1}`
                      );
                      if (prevInput) prevInput.focus();
                    }
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => handleVerifyOTP(otp.join(""))}
              className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-900 transition mb-4"
              disabled={isSubmitting || otp.join("").length !== 6}
            >
              {isSubmitting ? "Đang xác thực..." : "Xác nhận"}
            </button>
            <button
              onClick={handleResendOTP}
              className="w-full text-gray-700 underline hover:text-gray-900 transition"
              disabled={isResendingOTP || timer > 0} // Disable nếu OTP chưa hết hạn hoặc đang gửi lại
            >
              {isResendingOTP ? "Đang gửi lại OTP..." : "Gửi lại OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
