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
    <>
      <div className="bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Showing {start}-{end} of {total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 disabled:opacity-50"
          >
            <span className="material-icons-outlined text-sm">chevron_left</span>
          </button>
          <button
            onClick={goNext}
            disabled={!canNext}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400"
          >
            <span className="material-icons-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </>
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
