import React from "react";

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={` flex px-4 py-2 border hover:shadow-lg border-blue-300 text-neutral-600 rounded-lg  gap-3 ${
            currentPage === i + 1 ? "active text-neutral-900 border-blue-500" : ""
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex gap-3 justify-end mt-5">
      <div
        className={` flex px-4 items-center  h-auto cursor-pointer py-2 border border-blue-300 text-neutral-600 rounded-md bg-blue-50  gap-3 ${
          currentPage === 0 ? "disabled" : ""
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <div className=" flex gap-3 text-neutral-500">{renderPageNumbers()}</div>

      <div
        className={` flex items-center px-4 py-2 border border-blue-300 text-neutral-600 rounded-md bg-blue-50  gap-3 ${
          currentPage === pageCount - 1 ? "disabled" : ""
        }`}
        onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
