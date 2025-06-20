import { z } from "zod";

const gradeSchema = z.object({
    student_id: z.number(),
    grade: z
        .number()
        .min(1, "Grade cannot be below 0")
        .max(30, "Grade cannot be above 30"),
});

export const gradesFormSchema = z.object({
    grades: z.array(gradeSchema).min(1, "Almeno un grade richiesto"),
});

export type GradesFormData = z.infer<typeof gradesFormSchema>;
