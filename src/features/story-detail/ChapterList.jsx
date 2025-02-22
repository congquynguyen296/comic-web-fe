import { Link } from "react-router-dom";

export default function ChapterList({
  chapters,
  storyCode,
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách chương</h2>

      {/* Danh sách chapter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.chapterNumber}
            to={`/story/${storyCode}/chuong-${chapter.chapterNumber}`}
          >
            <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <span className="font-semibold">Chương {chapter.chapterNumber}: </span>
                <span className="text-gray-700">{chapter.title}</span>
              </div>
              <span className="text-gray-500 text-sm">{chapter.date}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0} // Vô hiệu hóa nút "Trang trước" nếu ở trang đầu tiên
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trang trước
        </button>

        <span className="text-gray-700">
          Trang {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1} // Vô hiệu hóa nút "Trang sau" nếu ở trang cuối cùng
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}
