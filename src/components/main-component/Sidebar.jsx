// components/Sidebar.jsx
import { BookOpenIcon, FireIcon, HeartIcon, SparklesIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const genres = [
    { name: "Tiên Hiệp", icon: SparklesIcon },
    { name: "Kiếm Hiệp", icon: FireIcon },
    { name: "Ngôn Tình", icon: HeartIcon },
    { name: "Đam Mỹ", icon: GlobeAltIcon },
  ];

  const recentUpdates = Array(10).fill("Truyện mới cập nhật chapter 100");

  // Mock data for "Truyện đề cử"
  const recommendedStories = Array(5).fill("Truyện đề cử: Tên Truyện Đề Cử");

  return (
    <div className="space-y-8 flex flex-col min-h-full">
      {/* Genre Tabs */}
      <div className="bg-white p-4 rounded-lg shadow flex-1">
        <h2 className="text-xl font-bold mb-4">Thể loại</h2>
        <div className="grid grid-cols-2 gap-2">
          {genres.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="p-2 flex items-center gap-2 text-left hover:bg-gray-100 rounded"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Mới cập nhật</h2>
        <div className="space-y-2">
          {recentUpdates.map((update, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm hover:text-gray-600 cursor-pointer truncate"
            >
              <BookOpenIcon className="w-5 h-5 text-gray-500" />
              {update}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Stories */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Truyện đề cử</h2>
        <div className="space-y-2">
          {recommendedStories.map((story, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm hover:text-gray-600 cursor-pointer truncate"
            >
              <BookOpenIcon className="w-5 h-5 text-gray-500" />
              {story}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
