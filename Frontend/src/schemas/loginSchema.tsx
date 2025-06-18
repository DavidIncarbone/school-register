import { z } from "zod";
// Tipizzazione custom di zod
export type LoginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email's field is required")
    .max(255, "Character max. 255")
    .email("Invalid email format"),
  password: z.string().min(1, "password's field is required"),
});
