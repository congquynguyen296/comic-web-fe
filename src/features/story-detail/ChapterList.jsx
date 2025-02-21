import { useState } from "react";
import { Link } from "react-router-dom";

export default function ChapterList({ chapters, storyCode }) {
  const [showAll, setShowAll] = useState(false);
  const visibleChapters = showAll ? chapters : chapters.slice(0, 20);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách chương</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleChapters.map((chapter) => (
          <Link key={chapter.code} to={`/story/${storyCode}/${chapter.code}`}>
            <div
              key={chapter.chapterNumber[chapter.chapterNumber.length - 1]}
              className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              <div>
                <span className="font-semibold">{chapter.chapterNumber}: </span>
                <span className="text-gray-700">{chapter.title}</span>
              </div>
              <span className="text-gray-500 text-sm">{chapter.date}</span>
            </div>
          </Link>
        ))}
      </div>

      {chapters.length > 20 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            {showAll ? "Thu gọn" : `Xem thêm ${chapters.length - 20} chương`}
          </button>
        </div>
      )}
    </div>
  );
}
