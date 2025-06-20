import { z } from "zod";
// Tipizzazione custom di zod
export type ExamFormData = z.infer<typeof examSchema>;

export const examSchema = z.object({
    topic: z
        .string()
        .nonempty("Topic's field is required")
        .min(8, "Insert a minimum of 8 characters"),
    date: z.string().nonempty("Date's field is required"),
});
