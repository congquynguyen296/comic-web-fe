export default function ErrorAuthMessage({ errorMessage }) {
  return (
    <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded-lg flex items-center">
      <svg
        className="w-5 h-5 mr-2 text-red-800"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 6a1 1 0 012 0v4a1 1 0 01-2 0V6zm1 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      {errorMessage}
    </div>
  );
}
