import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập (có thể thay bằng một trạng thái từ context hoặc state toàn cục)

  // Thông tin người dùng (giả sử có avatar nếu đăng nhập)
  const user = {
    name: "Công Quý",
    avatar:
      "https://khbvptr.com/wp-content/uploads/2024/09/avatar-anime-nam-cute-16HWPsm.jpg", // Link avatar người dùng
  };

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
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
          <div className="relative rounded-full border border-gray-300 overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Lắng nghe sự thay đổi input
              placeholder="Tìm kiếm truyện..."
              className="w-full px-6 py-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 px-4 bg-gray-100 hover:bg-gray-200"
            >
              <SearchIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Auth or User Info */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            // Nếu người dùng đã đăng nhập, hiển thị avatar và tên
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user.name}</span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút đăng nhập và đăng ký
            <>
              <button className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700">
                Đăng nhập
              </button>
              <button className="px-4 py-2 rounded-full border border-gray-800 hover:bg-gray-50">
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
