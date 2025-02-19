import { Link } from "react-router-dom";

export default function StoryItem({ id, title, description, chapterCount, coverImage }) {

  return (
    <Link to={`/story/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Hiển thị ảnh */}
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-52 w-full object-cover"
          />
        ) : (
          <div className="h-52 bg-gray-300"></div> // Fallback khi không có ảnh
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{title}</h3>
          <div className="text-sm text-gray-500 mb-2">
            {chapterCount} HQ
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
}
