import {
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function Pagination() {
  const apiRef = useGridApiContext();
  const currentPage = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handlePageChange = (page: number) => {
    apiRef.current.setPage(page);
  };

  const maxVisible = 3;
  let start = Math.max(0, currentPage - 1);
  const end = Math.min(pageCount, start + maxVisible);
  if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

  const visiblePages = Array.from(
    { length: end - start },
    (_, i) => start + i
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      pt={2.5}
      px={1}
      className="divide-x divide-gray-700"
    >
      {/* Previous */}
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 border-y border-l border-gray-700 rounded-l text-blue-500 disabled:opacity-30"
      >
        «
      </button>

      {/* Pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border-y border-gray-700
            ${
              currentPage === page
                ? "bg-white/10 text-white"
                : "text-blue-500 hover:text-white"
            }`}
        >
          {page + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === pageCount - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 border-y border-r border-gray-700 rounded-r text-blue-500 disabled:opacity-30"
      >
        »
      </button>
    </Box>
  );
}
