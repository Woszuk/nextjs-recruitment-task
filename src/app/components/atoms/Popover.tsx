import { useClickOutside } from "@/app/hooks/useClickOutside";
import React from "react";

type PopoverProps = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

export default function Popover({ children, handleClose, open }: PopoverProps) {
  const ref = useClickOutside<HTMLDivElement>(handleClose);

  if (!open) {
    return null;
  }

  return (
    <div
      className="absolute bg-white border-1 px-2 py-1 border-primary-light right-3 top-8 rounded-sm z-1"
      ref={ref}
    >
      {children}
    </div>
  );
}
