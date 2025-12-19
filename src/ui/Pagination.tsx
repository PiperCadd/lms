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

  const handlePageChange = (newPage: number) => {
    apiRef.current.setPage(newPage);
  };

  // ----- PAGINATION WINDOW -----
  const maxVisible = 3;

  let start = Math.max(0, currentPage - 1);
  let end = start + maxVisible;

  if (end > pageCount) {
    end = pageCount;
    start = Math.max(0, end - maxVisible);
  }

  const visiblePages = Array.from(
    { length: end - start },
    (_, idx) => start + idx
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      p={1}
      className="bg-[#0d1424] rounded-xl px-6 py-4"
    >
      {/* Previous */}
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 rounded-l text-blue-500 border border-gray-700 disabled:opacity-30 cursor-pointer"
      >
        «
      </button>

      {/* Page numbers (max three) */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 cursor-pointer
            ${
              currentPage === page
                ? "bg-white/10 text-white border-y border-l border-gray-700"
                : "text-blue-500 hover:text-white border border-gray-700"
            }`}
        >
          {page + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === pageCount - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 text-blue-500 disabled:opacity-30 border-r border-y border-gray-700 rounded-r cursor-pointer"
      >
        »
      </button>
    </Box>
  );
}
