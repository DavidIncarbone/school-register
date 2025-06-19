import { z } from "zod";
// Tipizzazione custom di zod
export type RetrieveTempUserFormData = z.infer<typeof retrieveTempUserSchema>;
export type EnableUserFormData = z.infer<typeof enableUserSchema>;

export const retrieveTempUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email's field is required")
    .max(255, "Character max. 255")
    .email("Invalid email format"),
  type: z.string().nonempty("Select a type"),
});

export const enableUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  // type: z.string(),
  password: z.string().min(8, "Password's field is required"),
  password_confirmation: z.string().min(8, "Password's field is required"),
});
