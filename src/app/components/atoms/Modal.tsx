import { useClickOutside } from "@/app/hooks/useClickOutside";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

export default function Modal({ children, open, handleClose }: ModalProps) {
  const ref = useClickOutside<HTMLDivElement>(handleClose);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 p-5 bg-black/30  flex justify-center items-center">
      <div
        className={`bg-gray-50 p-5 shadow-lg w-full max-w-[500px]`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
