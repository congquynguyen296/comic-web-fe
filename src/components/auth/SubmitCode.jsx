import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAuthMessage from "../message/ErrorAuthMessage";
import SuccessAuthMessage from "../message/SuccessAuthMessage";
import axios from "axios";

export default function SubmitCode({ email, token }) {

  console.log(email, token);

  const navigate = useNavigate();
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(600);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

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

  const handleVerifyOTP = async (otpCode) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/nettruyen/api/auth/active-account",
        {
          email: email,
          otpCode: otpCode,
          token: token,
        }
      );

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
          email: email,
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
        {errorMessage && <ErrorAuthMessage errorMessage={errorMessage} />}
        {/* Success Message */}
        {successMessage && <SuccessAuthMessage successMessage={successMessage} />}
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
      </div>
    </div>
  );
}
