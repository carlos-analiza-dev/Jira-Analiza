import * as z from "zod";

export const schemaRegister = z
  .object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    correo: z.string().email("El correo electrónico no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
    sexo: z.string(),
    edad: z
      .number()
      .min(1, "Debe ser mayor a 0")
      .max(120, "Debe ser menor o igual a 120"),
    dni: z.string().length(13, "El DNI debe tener 13 caracteres"),
    direccion: z
      .string()
      .max(100, "La dirección no puede exceder los 100 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
