import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAuthMessage from "../components/message/ErrorAuthMessage";
import SuccessAuthMessage from "../components/message/SuccessAuthMessage";
import RegisterForm from "../components/auth/RegisterForm";

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Bạn phải đồng ý với điều khoản để đăng ký!");
      return;
    }

    setIsSubmitting(true);

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
        {successMessage && (
          <SuccessAuthMessage successMessage={successMessage} />
        )}
        <>
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900">
            Đăng ký Q.comic
          </h1>
          <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleRegister={handleRegister}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            isSubmitting={isSubmitting}
          />
        </>
      </div>
    </div>
  );
};

export default RegisterPage;
