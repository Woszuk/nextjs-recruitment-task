import Button from "@/app/components/atoms/Button";
import Pagination from "@/app/components/atoms/Pagination";
import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PAGE_SIZE } from "@/app/constants";

type ListProps = {
  children: React.ReactNode;
  title: string;
  buttonLabel: string;
  totalItems: number;
  currentPage: number;
  error?: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  toggleOpen: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function List({
  children,
  title,
  buttonLabel,
  totalItems,
  currentPage,
  error,
  setCurrentPage,
  toggleOpen,
}: ListProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative flex items-center sm:justify-center justify-between ">
        <p className="text-2xl font-bold uppercase">{title}</p>
        <Button
          className="sm:absolute sm:right-10"
          label={buttonLabel}
          onClick={toggleOpen}
        />
      </div>
      {error ? (
        <div className="text-xl text-center col-span-full mt-10">{error}</div>
      ) : (
        <>
          <div className="grid lg:grid-cols-2 gap-2 font-medium ">
            {children}
          </div>
          <Pagination
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
