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
  userList?: boolean;
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
  userList = false,
  setCurrentPage,
  toggleOpen,
}: ListProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`${pathname}?page=${page}`);
  };

  const backToUserList = () => {
    router.push(`/`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative flex items-center sm:justify-center justify-between ">
        {!userList && (
          <div
            className="sm:absolute left-4 cursor-pointer text-3xl p-2"
            onClick={backToUserList}
          >
            &larr;
          </div>
        )}
        <p className="text-xl sm:text-2xl font-bold uppercase">{title}</p>
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
          {totalItems !== 0 ? (
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
          ) : (
            <div className="text-center font-bold text-2xl mt-10">
              No elements!
            </div>
          )}
        </>
      )}
    </div>
  );
}
