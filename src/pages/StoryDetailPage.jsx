import Header from "../components/main-component/Header";
import StoryInfo from "../features/story-detail/StoryInfo";
import Synopsis from "../features/story-detail/Synopsis";
import ChapterList from "../features/story-detail/ChapterList";
import Footer from "../components/main-component/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function StoryDetailPage() {
  const { code } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch lấy dữ liệu truyện
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/nettruyen/api/story/${code}`
        );
        setStory(response.data.result); // Lưu dữ liệu từ API
        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchStory();
  }, [code]); // Chỉ chạy lại khi code thay đổi

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (!story) {
    return <div>No story found.</div>; // Hiển thị nếu không có dữ liệu
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Truyền dữ liệu vào StoryInfo */}
        <StoryInfo
          title={story.title}
          code={story.code}
          author={story.author}
          status={story.status}
          coverImage={story.coverImage}
          generates={story.generates}
          chapters={story.chapters}
        />
        <div className="my-8 border-t border-gray-200"></div>
        {/* Truyền dữ liệu vào Synopsis */}
        <Synopsis description={story.description} />
        <div className="my-8 border-t border-gray-200"></div>
        {/* Truyền dữ liệu vào ChapterList (bọc bằng context provider - useContext) */}
        <ChapterList chapters={story.chapters} storyCode={story.code} />

        {/* {Phần xem thêm} */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => console.log("Xem thêm")}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Xem thêm
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
