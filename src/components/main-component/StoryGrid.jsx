// components/StoryGrid.jsx
import StoryItem from './StoryItem';
import { useState } from 'react';

const stories = Array(45).fill({
  title: 'Tên Truyện Dài Tên Truyện Dài',
  description: 'Mô tả ngắn cho truyện này, giới thiệu nội dung cơ bản của truyện...',
  chapterCount: 150,
});

const STORIES_PER_PAGE = 9; // Số lượng truyện trên mỗi trang

export default function StoryGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán truyện nào sẽ hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
  const currentStories = stories.slice(startIndex, startIndex + STORIES_PER_PAGE);

  // Hàm để chuyển đến trang tiếp theo
  const nextPage = () => {
    if (currentPage < Math.ceil(stories.length / STORIES_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm để quay lại trang trước
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Story Grid */}
      <div className="grid grid-cols-3 gap-16">
        {currentStories.map((story, index) => (
          <StoryItem key={index} {...story} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        {/* Previous Page Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"
        >
          Trước
        </button>

        {/* Page Number Display */}
        <span className="self-center text-black">
          Trang {currentPage} / {Math.ceil(stories.length / STORIES_PER_PAGE)}
        </span>

        {/* Next Page Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(stories.length / STORIES_PER_PAGE)}
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
