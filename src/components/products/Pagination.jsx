import React from "react";
const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
  nextPageText,
  prevPageText,
  itemClass,
  linkClass,
  activeClass,
  activeLinkClass,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItemsCount / itemsCountPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-6">
      <ul className="pagination flex space-x-2">
        {activePage > 1 && (
          <li className={`${itemClass}`}>
            <button
              className={`${linkClass} bg-blue-500 text-white px-3 py-1 rounded-full`}
              onClick={() => onChange(activePage - 1)}
            >
              {prevPageText}
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${itemClass} ${
              activePage === number ? activeClass : ""
            }`}
          >
            <button
              className={`${
                activePage === number
                  ? `${linkClass} ${activeLinkClass}`
                  : linkClass
              } bg-blue-500 text-white px-3 py-1 rounded-full`}
              onClick={() => onChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {activePage < pageNumbers.length && (
          <li className={`${itemClass}`}>
            <button
              className={`${linkClass} bg-blue-500 text-white px-3 py-1 rounded-full`}
              onClick={() => onChange(activePage + 1)}
            >
              {nextPageText}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
