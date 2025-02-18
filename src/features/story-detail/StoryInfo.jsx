import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import axios from "axios"; // Import axios

export default function StoryInfo() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(null); // Thêm trạng thái error

  useEffect(() => {
    // Fetch dữ liệu từ API dựa trên id
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/nettruyen/api/story/${id}`
        );
        setStory(response.data.result); // Dữ liệu từ API được lưu trong response.data
        setLoading(false); // Tắt trạng thái loading

        console.log(response);
      } catch (error) {
        console.error("Error fetching story:", error);
        setError(error); // Lưu lỗi nếu có
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Hiển thị lỗi nếu có
  }

  if (!story) {
    return <div>No story found.</div>; // Hiển thị nếu không có dữ liệu
  }

  return (
    <div className="relative flex gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div
        className="w-32 h-48 bg-cover rounded-md"
        style={{ backgroundImage: `url(${story.coverImage})` }}
      ></div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {story.title}
          </h1>

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
            <span className="font-medium">Số chương:</span>
            <span className="ml-2">{story.chapters}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Tình trạng:</span>
            <span className="ml-2 text-green-600">{story.status}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Thể loại:</span>
            <span className="ml-2 text-blue-600">
              {story.generates.join(", ")}
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            onClick={() => console.log("Đọc từ đầu")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Đọc từ đầu
          </button>

          <button
            onClick={() => console.log("Chap mới nhất")}
            className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            Chap mới nhất
          </button>
        </div>
      </div>
    </div>
  );
}
