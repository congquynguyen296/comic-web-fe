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
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
  const [pageSize, setPageSize] = useState(20); // Số lượng chapter trên mỗi trang
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang

  // Fetch lấy dữ liệu truyện
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const [storyResponse, totalChaptersResponse] = await Promise.all([
          axios.get(`http://localhost:8080/nettruyen/api/story/${code}?page-no=${currentPage}&page-size=${pageSize}`),
          axios.get(`http://localhost:8080/nettruyen/api/story/${code}/total-chapters`)
        ]);
  
        setStory(storyResponse.data.result);
        setTotalPages(Math.ceil(totalChaptersResponse.data / pageSize)); // Tính tổng số trang đúng cách
        setLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };
  
    fetchStory();
  }, [code, currentPage, pageSize]); // Chạy lại khi code, currentPage hoặc pageSize thay đổi
  
  // Hàm chuyển trang
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1); // Giảm trang hiện tại đi 1
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1); // Tăng trang hiện tại lên 1
    }
  };

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
        {/* Truyền dữ liệu vào ChapterList */}
        <ChapterList
          chapters={story.chapters}
          storyCode={story.code}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      </div>

      <Footer />
    </div>
  );
}