import { useState, useEffect } from "react";
import axios from "axios";
import StoryItem from "./StoryItem";

const STORIES_PER_PAGE = 2; // Số lượng truyện trên mỗi trang

export default function StoryGrid() {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/nettruyen/stories", {
          params: {
            pageNo: currentPage,
            pageSize: STORIES_PER_PAGE,
          },
        });
  
        console.log("Full API Response:", response.data);
  
        // Truy xuất danh sách truyện và số trang đúng
        const data = response.data.result; // Đây là object chứa các thông tin
        if (!data) {
          console.error("API không trả về kết quả!");
          return;
        }
  
        setStories(data.content || []); // Sửa thành data.result
        setTotalPages(data.totalPages || 1); // Số trang
  
        console.log("Stories:", data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
  
    fetchStories();
  }, [currentPage]);
  

  // Chuyển trang
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {/* Story Grid */}
      <div className="grid grid-cols-3 gap-16">
        {stories.map((story) => (
          <StoryItem key={story.id} {...story} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"
        >
          Trước
        </button>

        <span className="self-center text-black">
          Trang {currentPage} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
