import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email es invalido" })
    .refine((email) => email.includes("@unipamplona.edu.co"), {
      message: "El email debe ser de @unipamplona.edu.co",
    }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerido" })
    .min(4, { message: "La contraseña debe tener al menos 4 caracteres" }),
})
