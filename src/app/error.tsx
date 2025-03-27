"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex justify-center">
      <p className="text-xl font-bold">
        Something went wrong. Try again later!
      </p>
    </div>
  );
}
