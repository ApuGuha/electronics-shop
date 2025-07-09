

export const Pagination = ({totalPages, currentPage, goToNextPage, goToPrevPage}) => {
  return (
    <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          ← Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next →
        </button>
    </div>
  )
}
