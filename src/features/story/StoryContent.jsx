import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

const ComicReaderPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [totalChapters, setTotalChapters] = useState(0);
  const [loading, setLoading] = useState(true);

  const { storyCode, chapterNumber } = useParams();
  const navigate = useNavigate();

  // Fetch dữ liệu chương và tổng số chương
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chapterResponse, totalChaptersResponse] = await Promise.all([
          axios.get(`http://localhost:8080/nettruyen/api/chapter?story-code=${storyCode}&chapter-number=${chapterNumber}`),
          axios.get(`http://localhost:8080/nettruyen/api/story/${storyCode}/total-chapters`),
        ]);

        setChapter(chapterResponse.data.result);
        setTotalChapters(totalChaptersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storyCode, chapterNumber]);

  // Hàm điều hướng chương
  const goToPreviousChapter = useCallback(() => {
    const currentChapterNumber = parseInt(chapterNumber.split("-")[1]);
    if (currentChapterNumber > 1) {
      const previousChapterCode = `chuong-${currentChapterNumber - 1}`;
      navigate(`/story/${storyCode}/${previousChapterCode}`);
    }
  }, [chapterNumber, storyCode, navigate]);

  const goToNextChapter = useCallback(() => {
    const currentChapterNumber = parseInt(chapterNumber.split("-")[1]);
    const nextChapterCode = `chuong-${currentChapterNumber + 1}`;
    navigate(`/story/${storyCode}/${nextChapterCode}`);
  }, [chapterNumber, storyCode, navigate]);

  // Kiểm tra chương đầu tiên và chương cuối cùng
  const isFirstChapter = chapterNumber === "chuong-1";
  const isLastChapter = totalChapters > 0 && parseInt(chapterNumber.split("-")[1]) === totalChapters;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!chapter) {
    return <div>Không tìm thấy chương.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Tiêu đề truyện */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 mb-6 max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Tên truyện</h1>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200"
          >
            <BookmarkIcon
              className={`w-8 h-8 transition-all duration-300 ${
                isSaved ? "text-gray-900 scale-110" : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2">
          Chương {chapter.chapterNumber}: {chapter.title}
        </h2>

        <div className="pt-6">
          {/* Điều hướng */}
          <div className="flex justify-between">
            <button
              onClick={goToPreviousChapter}
              disabled={isFirstChapter}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-5 h-5 inline-block mr-2" /> Chương trước
            </button>

            <button
              onClick={goToNextChapter}
              disabled={isLastChapter}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chương sau <ChevronRightIcon className="w-5 h-5 inline-block ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Nội dung chương */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mx-auto border border-gray-300 leading-7">
        <p
          className="text-gray-800 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(chapter.content),
          }}
        ></p>
      </div>

      {/* Điều hướng chương */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 mt-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousChapter}
            disabled={isFirstChapter}
            className="px-5 py-3 text-gray-100 bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeftIcon className="w-6 h-6" /> Chương trước
          </button>

          <span className="text-lg font-semibold text-gray-700 tracking-wide">
            Chương {chapter.chapterNumber} / {totalChapters}
          </span>

          <button
            onClick={goToNextChapter}
            disabled={isLastChapter}
            className="px-5 py-3 text-gray-100 bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Chương sau <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicReaderPage;