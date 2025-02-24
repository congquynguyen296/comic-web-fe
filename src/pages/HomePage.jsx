import Header from "../components/main-component/Header";
import Banner from "../components/main-component/Banner";
import MainContent from "../components/main-component/MainContent";
import Footer from "../components/main-component/Footer";
import { getToken } from "../services/localStorageService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getToken();

    if (!accessToken) {
      console.log("No access token found, redirecting to login");
      navigate("/login");
      return;
    }

    console.log("Access Token:", accessToken);

    const getUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/nettruyen/api/user/my-info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text(); // Lấy thông tin lỗi chi tiết
          throw new Error(
            `HTTP error! Status: ${response.status}, Details: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data); // Log toàn bộ phản hồi

        if (data.result) {
          setUserDetails(data.result);
        } else {
          console.error("No 'result' field in API response:", data);
          setUserDetails(null); // Đảm bảo reset nếu không có result
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        navigate("/login");
      }
    };

    getUserDetails();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header userDetail={userDetails} />
      <Banner />
      <MainContent />
      <Footer />
    </div>
  );
}
