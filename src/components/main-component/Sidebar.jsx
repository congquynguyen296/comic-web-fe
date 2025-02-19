import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpenIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const recentUpdates = Array(5).fill("Truyện mới cập nhật chapter 100");
  const recommendedStories = Array(5).fill("Truyện đề cử: Tên Truyện Đề Cử");

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

  return (
    <div className="space-y-6 flex flex-col min-h-full pr-4">
      {/* Genre Tabs */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Thể loại</h2>
          <ArrowRightIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-100 rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1.5">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className="flex items-center px-3 py-2.5 text-sm rounded-lg 
                  hover:bg-gray-50 transition-colors duration-200
                  group text-gray-700 hover:text-gray-900"
              >
                <BookOpenIcon
                  className="w-4 h-4 mr-2.5 text-gray-400 
                  group-hover:text-gray-600 transition-colors"
                />
                {genre.name}
                <span
                  className="ml-auto text-xs px-1.5 py-1 rounded-full 
                  bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                >
                  {Math.floor(Math.random() * 50) + 1}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent Updates */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Mới cập nhật
        </h2>
        <div className="space-y-3.5">
          {recentUpdates.map((update, index) => (
            <div
              key={index}
              className="flex items-start pl-2.5 group cursor-pointer"
            >
              <div
                className="w-1.5 h-1.5 mt-2.5 mr-3.5 bg-gray-300 rounded-full 
                group-hover:bg-gray-400 transition-colors"
              />
              <p
                className="text-sm text-gray-600 leading-snug hover:text-gray-800 
                transition-colors flex-1 truncate"
              >
                {update}
                <span className="ml-2 text-xs text-gray-400">5 phút trước</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Stories */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Đề cử</h2>
        <div className="space-y-4">
          {recommendedStories.map((story, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg bg-gradient-to-r 
                from-gray-50 to-gray-50/50 hover:from-gray-100 transition-all
                border border-gray-100 hover:border-gray-200 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-md bg-gray-200 flex items-center 
                justify-center mr-3"
              >
                <BookOpenIcon className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-700 font-medium truncate">
                {story}
                <span className="block text-xs text-gray-400 font-normal mt-0.5">
                  {index % 2 === 0 ? "Action · 4.8★" : "Drama · 4.5★"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
