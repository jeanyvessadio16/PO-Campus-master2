import { z } from "zod";

export const courseSchema = z.object({
  photo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5000000,
      "La taille de l'image doit être inférieure à 5MB",
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Le fichier doit être une image",
    ),
  title: z
    .string()
    .min(2, { message: "Le titre doit contenir au moins 2 caractères" })
    .max(100, { message: "Le titre ne doit pas dépasser 100 caractères" }),
  semestre: z.string().min(1, { message: "Veuillez sélectionner un semestre" }),
});

export const assignmentSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Le titre doit contenir au moins 2 caractères" })
    .max(100, { message: "Le titre ne doit pas dépasser 100 caractères" }),
  instructions: z.string().min(10, {
    message: "La consigne doit contenir au moins 10 caractères",
  }),
  dueDate: z.date({
    message: "La date limite est requise",
  }),
  courseId: z.string().min(1, { message: "Veuillez sélectionner un cours" }),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
export type AssignmentFormValues = z.infer<typeof assignmentSchema>;
