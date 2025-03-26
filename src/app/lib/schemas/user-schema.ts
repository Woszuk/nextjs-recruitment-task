import { UserStatus } from "@/app/lib/enums/user";
import { z } from "zod";

export const userSchema = z.object({
  first_name: z
    .string()
    .max(60, "First name must not exceed 60 characters")
    .optional(),
  last_name: z
    .string({ required_error: "Last name is required" })
    .max(100, "Last name must not exceed 100 characters")
    .nonempty({ message: "Last name must not be empty" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .max(100, "Email must not exceed 100 characters")
    .nonempty({ message: "Email must not be empty" }),
  initials: z
    .string()
    .max(30, "Initials must not exceed 30 characters")
    .optional(),
  status: z.nativeEnum(UserStatus, {
    message: `Status must be one of (${Object.keys(UserStatus).join(",")})`,
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
