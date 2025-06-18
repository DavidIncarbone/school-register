import { z } from "zod";
// Tipizzazione custom di zod
export type AssignmentFormData = z.infer<typeof assignmentsSchema>;

export const assignmentsSchema = z.object({
  body: z
    .string()
    .min(1, "Body field is required")
    .max(5000, "the maximum number of characters is 5000"),
  assignment_date: z.string().nonempty("Start's filed is required"),
  deadline: z.string().nonempty("Deadline's filed is required"),
  course_id: z.any(),
});
