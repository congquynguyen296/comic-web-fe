import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../services/localStorageService";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react"; // Để tạo animation

// Định nghĩa animation cho spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const AuthenticatePage = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log(window.location.href);

    // Lấy ra code khi oauth server gửi về client theo phương thức authentication code
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `http://localhost:8080/nettruyen/api/auth/outbound/authentication?code=${authCode}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setToken(data.result?.token);
          setIsLoggedin(true);
        })
        .catch((error) => {
          console.error("Authentication failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/home-page");
    }
  }, [isLoggedin, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // Xám nhạt làm nền
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "24px",
        padding: "20px",
      }}
    >
      {/* Spinner Container */}
      <Box
        sx={{
          width: "60px",
          height: "60px",
          border: "6px solid #e0e0e0", // Viền xám nhạt
          borderTop: "6px solid #333", // Đen cho phần quay
          borderRadius: "50%",
          animation: `${spin} 1.2s linear infinite`, // Animation quay
        }}
      />

      {/* Text */}
      <Typography
        variant="h6"
        sx={{
          color: "#333", // Đen nhạt
          fontWeight: "500",
          letterSpacing: "0.5px",
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Đang xác thực...
      </Typography>

      {/* Optional: Thêm hiệu ứng phụ */}
      <Box
        sx={{
          width: "200px",
          height: "4px",
          backgroundColor: "#e0e0e0", // Xám nhạt
          borderRadius: "2px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            backgroundColor: "#666", // Xám đậm
            position: "absolute",
            animation: "slide 2s infinite ease-in-out",
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthenticatePage;