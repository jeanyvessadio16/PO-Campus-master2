import { z } from "zod";

export const userScheme = z.object({
  id: z.string().min(1, { message: "L'ID est requis" }),
  firstname: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le prénom ne doit pas dépasser 50 caractères" })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne doit pas dépasser 50 caractères" })
    .trim(),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .max(128, {
      message: "Le mot de passe ne doit pas dépasser 128 caractères",
    })
    .trim(),
  role: z
    .enum(["student", "teacher", "admin"])
    .refine((value) => ["student", "teacher", "admin"].includes(value), {
      message: "Le rôle doit être 'student', 'teacher' ou 'admin'",
    }),
});

export type User = z.infer<typeof userScheme>;
