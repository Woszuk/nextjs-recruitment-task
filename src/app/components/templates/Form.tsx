import Button from "@/app/components/atoms/Button";
import { FormEventHandler } from "react";

type FormProps = {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  children: React.ReactNode;
};

export default function Form({ title, onSubmit, children }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p className="text-center uppercase font-bold text-xl mb-5">{title}</p>
      {children}
      <Button type="submit" label="Create" variant="contained" />
    </form>
  );
}
