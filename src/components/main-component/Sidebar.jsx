import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/nettruyen/api/generate") // Gọi API từ backend
      .then((response) => {
        setGenres(response.data.result); // Giả sử API trả về { result: [...] }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
        setLoading(false);
      });
  }, []);

  const recentUpdates = Array(10).fill("Truyện mới cập nhật chapter 100");
  const recommendedStories = Array(5).fill("Truyện đề cử: Tên Truyện Đề Cử");

  return (
    <div className="space-y-8 flex flex-col min-h-full">
      {/* Genre Tabs */}
      <div className="bg-white p-4 rounded-lg shadow flex-1">
        <h2 className="text-xl font-bold mb-4">Thể loại</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id} // Sử dụng id từ API
                className="p-2 flex items-center gap-2 text-left hover:bg-gray-100 rounded"
              >
                <BookOpenIcon className="w-5 h-5 text-gray-500" />
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent Updates */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Mới cập nhật</h2>
        <div className="space-y-2">
          {recentUpdates.map((update, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm hover:text-gray-600 cursor-pointer truncate"
            >
              <BookOpenIcon className="w-5 h-5 text-gray-500" />
              {update}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Stories */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Truyện đề cử</h2>
        <div className="space-y-2">
          {recommendedStories.map((story, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm hover:text-gray-600 cursor-pointer truncate"
            >
              <BookOpenIcon className="w-5 h-5 text-gray-500" />
              {story}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
