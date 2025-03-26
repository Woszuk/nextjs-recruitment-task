import Button from "@/app/components/atoms/Button";

type PaginationProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  pageSize,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 justify-center lg:text-base">
      <Button
        label="First"
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      />

      <Button
        label="Prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <span>
        {currentPage} of {totalPages}
      </span>

      <Button
        label="Next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />

      <Button
        label="Last"
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
