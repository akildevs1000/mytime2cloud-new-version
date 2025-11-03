import React from "react";
import PropTypes from "prop-types";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const defaultLabels = {
  showing: "Showing",
  to: "to",
  of: "of",
  results: "results",
  previous: "Previous",
  next: "Next",
  perPageSuffix: "/ page",
};

function Pagination({
  page, // 1-based
  perPage,
  total,
  isLoading = false,

  onPageChange,
  onPerPageChange,

  pageSizeOptions = [10, 25, 50],
  className = "",
  contentClassName = "",
  hidePerPage = false,
  labels = defaultLabels,

  LeftIcon, // optional icon component
  RightIcon, // optional icon component
}) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));
  const currentPage = clamp(page || 1, 1, totalPages);

  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  const canPrev = currentPage > 1 && !isLoading;
  const canNext = currentPage < totalPages && !isLoading;

  const goPrev = () => canPrev && onPageChange(currentPage - 1);
  const goNext = () => canNext && onPageChange(currentPage + 1);

  return (
    <div
      className={
        "flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg flex-col sm:flex-row space-y-3 sm:space-y-0 " +
        className
      }
    >
      <p className="text-sm text-gray-600">
        {labels.showing} <span className="font-semibold">{start}</span>{" "}
        {labels.to} <span className="font-semibold">{end}</span> {labels.of}{" "}
        <span className="font-semibold">{total}</span> {labels.results}
      </p>

      <div className={"flex items-center " + contentClassName}>
        {/* Previous */}
        <button
          onClick={goPrev}
          disabled={!canPrev}
          aria-label={labels.previous}
          className="p-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {LeftIcon ? (
            <LeftIcon className="w-4 h-4 mr-1" />
          ) : (
            <span className="mr-1">‹</span>
          )}
          {labels.previous}
        </button>

        {/* Current Page Indicator */}
        <span className="mx-2 p-2 px-4 border border-indigo-600 bg-primary text-white rounded-md text-sm font-semibold flex items-center">
          {currentPage} / {totalPages}
        </span>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={!canNext}
          aria-label={labels.next}
          className="p-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {labels.next}
          {RightIcon ? (
            <RightIcon className="w-4 h-4 ml-1" />
          ) : (
            <span className="ml-1">›</span>
          )}
        </button>

        {/* Per Page Selector */}
        {!hidePerPage && (
          <select
            value={perPage}
            onChange={(e) =>
              onPerPageChange && onPerPageChange(Number(e.target.value))
            }
            className="ml-4 p-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n} {labels.perPageSuffix}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  hidePerPage: PropTypes.bool,
  labels: PropTypes.shape({
    showing: PropTypes.string,
    to: PropTypes.string,
    of: PropTypes.string,
    results: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string,
    perPageSuffix: PropTypes.string,
  }),
  LeftIcon: PropTypes.elementType,
  RightIcon: PropTypes.elementType,
};

export default React.memo(Pagination);
