export default function SuccessAuthMessage( {successMessage}) {
  return (
    <div className="mb-4 p-4 text-sm text-green-800 bg-green-100 border border-green-400 rounded-lg flex items-center">
      <svg
        className="w-5 h-5 mr-2 text-green-800"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {successMessage}
    </div>
  );
}
