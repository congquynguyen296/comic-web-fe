import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function StoryInfo() {
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock data
  const story = {
    title: "Tên Truyện Dài",
    cover: "https://via.placeholder.com/200x300",
    chapters: 150,
    status: "Đang tiến hành",
    genres: ["Tiên Hiệp", "Xuyên Không"],
  };

  return (
    <div className="relative flex gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      {/* Ảnh bìa */}
      <div className="w-32 h-48 bg-cover rounded-md" style={{ backgroundImage: `url(${story.cover})` }}></div>

      {/* Thông tin chi tiết */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{story.title}</h1>
          
          {/* Nút bookmark */}
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 rounded-full transition-all hover:bg-gray-200"
          >
            <BookmarkIcon className={`w-8 h-8 ${isSaved ? 'text-blue-500' : 'text-gray-400'}`} />
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
            <span className="ml-2 text-blue-600">{story.genres.join(', ')}</span>
          </div>
        </div>

        {/* Nút di chuyển đến góc dưới phải */}
        <div className="absolute bottom-4 right-4 flex gap-3">
          {/* Nút đọc từ đầu */}
          <button
            onClick={() => console.log('Đọc từ đầu')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Đọc từ đầu
          </button>

          {/* Nút chap mới nhất */}
          <button
            onClick={() => console.log('Chap mới nhất')}
            className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            Chap mới nhất
          </button>
        </div>
      </div>
    </div>
  );
}
