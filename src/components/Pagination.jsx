import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div className="flex justify-center mt-10 items-center gap-2">
      <button
        onClick={() => !prevDisabled && onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        className={`p-2 rounded-lg transition border 
          ${prevDisabled 
            ? "opacity-40 cursor-not-allowed border-gray-300 dark:border-gray-600" 
            : "hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white"}
        `}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => !nextDisabled && onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        className={`p-2 rounded-lg transition border 
          ${nextDisabled 
            ? "opacity-40 cursor-not-allowed border-gray-300 dark:border-gray-600" 
            : "hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 dark:text-white"}
        `}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  );
}
