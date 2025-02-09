// components/StoryItem.jsx

import { Link } from "react-router-dom";

export default function StoryItem({ id, title, description, chapterCount }) {
  return (
    <Link to={`/story/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-52 bg-gray-300"></div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{title}</h3>
          <div className="text-sm text-gray-500 mb-2">
            {chapterCount} chương
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
}
