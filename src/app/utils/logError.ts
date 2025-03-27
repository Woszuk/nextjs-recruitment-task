import { logger } from "@/app/lib/config/logger";

export const logError = ({
  error,
  message,
}: {
  error: unknown;
  message: string;
}) => {
  logger.error(
    {
      error,
      ...(error instanceof Error && { message: error.message }),
    },
    message
  );
};
