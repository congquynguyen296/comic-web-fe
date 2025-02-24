import React from "react";
import { Google } from "@mui/icons-material";
import { OAuthConfig } from "../../configurations/oauthConfiguration"; // Import cấu hình OAuth

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    // Tạo URL OAuth2 cho Google
    const googleAuthUrl = `${OAuthConfig.authUri}?client_id=${
      OAuthConfig.clientId
    }&redirect_uri=${encodeURIComponent(
      OAuthConfig.redirectUri
    )}&response_type=code&scope=openid%20email%20profile`;  // Theo grant type authentication code

    // Chuyển hướng đến trang đăng nhập Google
    window.location.href = googleAuthUrl;
  };
  
  return (
    <button
      onClick={handleGoogleLogin}
      className="p-3 border border-gray-300 rounded-md hover:bg-gray-200 transition"
    >
      <Google className="!w-6 !h-6 text-gray-700" />
    </button>
  );
};

export default GoogleLogin;
