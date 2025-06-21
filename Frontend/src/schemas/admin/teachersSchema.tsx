import { z } from "zod";
// Tipizzazione custom di zod
export type TeacherFormData = z.infer<typeof teachersSchema>;

export const teachersSchema = z.object({
  id: z.number(),
  email: z
    .string()
    .email("Invalid email format")
    .min(4, "Min. characters are 4")
    .max(255, "Max. characters are 255")
    .nonempty("Email field is required"),
  first_name: z
    .string()
    .min(1, "First Name field is required")
    .max(255, "Max. characters are 255"),
  last_name: z
    .string()
    .min(1, "First Name field is required")
    .max(255, "Max. characters are 255"),
  courses_ids: z.array(z.string()).min(1, "Select courses is required"),
  subject_id: z.string().min(1, "Subject is required"),
});
