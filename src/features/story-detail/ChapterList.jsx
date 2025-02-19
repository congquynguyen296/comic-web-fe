import { useState } from 'react';

export default function ChapterList() {
  const [showAll, setShowAll] = useState(false);

  // Mock data
  const chapters = Array.from({ length: 25 }, (_, i) => ({
    number: i + 1,
    date: `2024-03-${String(i + 1).padStart(2, '0')}`,
    name: `Tên chương ${i + 1}`, // Thêm tên chương
  }));

  const visibleChapters = showAll ? chapters : chapters.slice(0, 20);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách chương</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleChapters.map((chapter) => (
          <div
            key={chapter.number}
            className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200"
          >
            <div>
              <span className="font-semibold">Chương {chapter.number}: </span>
              <span className="text-gray-700">{chapter.name}</span>
            </div>
            <span className="text-gray-500 text-sm">{chapter.date}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        {chapters.length > 20 && (
          <>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              {showAll ? 'Thu gọn' : `Xem thêm ${chapters.length - 20} chương`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
