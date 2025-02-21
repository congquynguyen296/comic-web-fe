import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
  const [userToken, setUserToken] = useState(null); // Hiện tên đăng nhập nếu đã đăng nhập
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    // Kiểm tra xem user đã đăng nhập chưa
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUserToken(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-black">Q.comic</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative rounded-full border border-gray-300 overflow-hidden transition-all duration-300 hover:border-gray-400 hover:shadow-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Lắng nghe sự thay đổi input
              placeholder="Tìm kiếm truyện..."
              className="w-full px-6 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 px-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              <SearchIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Auth or User Info */}
        <div className="flex items-center gap-2">
          {userToken ? (
            // Nếu đã đăng nhập, hiển thị avatar và tên user
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{"Công Quý"}</span>
              <img
                src="https://res.cloudinary.com/dyimxnbb8/image/upload/v1739182784/c1f3dec5-06db-4334-87ca-bd965612530f_avatar07.jpg"
                alt={userToken}
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút đăng nhập và đăng ký
            <>
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
              >
                Đăng nhập
              </button>
              <button
                onClick={handleRegisterClick}
                className="px-4 py-2 rounded-full border border-gray-800 hover:bg-gray-50"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
