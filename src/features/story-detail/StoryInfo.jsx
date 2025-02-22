import { useEffect, useState } from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function StoryInfo({
  title,
  code,
  author,
  status,
  coverImage,
  generates,
  chapters,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  // Hàm xử lý đọc từ đầu
  const readFirst = () => {
    window.location.href = `/story/${code}/chuong-1`;
  };

  // Hàm xử lý đọc cuối (fetch ra tổng số chươnh)
  useEffect(() => {
    const fetchTotalChapters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/nettruyen/api/story/${code}/total-chapters`
        );
        setTotalPages(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy tổng số chương:", error);
      }
    };

    fetchTotalChapters();
  }, []); // Chạy 1 lần khi component mount
  const readLast = () => {
    if (totalPages > 0) {
      window.location.href = `/story/${code}/chuong-${totalPages}`;
    }
  };

  return (
    <div className="relative flex gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div
        className="w-32 h-48 bg-cover rounded-md"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 rounded-full transition-all hover:bg-gray-200"
          >
            <BookmarkIcon
              className={`w-8 h-8 ${
                isSaved ? "text-blue-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="mt-4 space-y-1 text-gray-600">
          <div className="flex items-center">
            <span className="font-bold">Tác giả:</span>
            <span className="ml-2">{author}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Số chương:</span>
            <span className="ml-2">{chapters.length}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Tình trạng:</span>
            <span className="ml-2 text-green-600">{status}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Thể loại:</span>
            <span className="ml-2 text-blue-600">{generates.join(", ")}</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            onClick={() => readFirst()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Đọc từ đầu
          </button>

          <button
            onClick={() => readLast()}
            className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            Chap mới nhất
          </button>
        </div>
      </div>
    </div>
  );
}
