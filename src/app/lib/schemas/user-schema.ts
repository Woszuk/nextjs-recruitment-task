import { UserStatus } from "@/app/lib/enums/user";
import { z } from "zod";

export const schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  initials: z.string().optional(),
  status: z.nativeEnum(UserStatus),
});

export type FormData = z.infer<typeof schema>;
