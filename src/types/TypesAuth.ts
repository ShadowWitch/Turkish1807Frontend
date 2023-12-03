import { z } from "zod";

export const PasswordSchema = z
  .string()
  .refine((value) => !/\s/.test(value), {
    message: "La contraseña no puede contener espacios",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "La contraseña debe tener al menos una letra mayuscula",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "La contraseña debe tener al menos una letra minuscula",
  })
  .refine((value) => /\d/.test(value), {
    message: "La contraseña debe tener al menos un número",
  })
  .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value), {
    message: "La contraseña debe tener al menos un caracter especial",
  })
  .refine((value) => !(value.length < 8), {
    message: "La contraseña debe de contener al menos 8 caracteres",
  });

export const TypeLogin = z.object({
  nombre: z
    .string()
    .trim()
    .min(5, {
      message: "Debe contener minimo 5 caracteres",
    })
    .max(15, {
      message: "Debe contener un maximo de 15 caracteres",
    }),
  contrasena: z
    .string()
    .trim()
    .min(5, {
      message: "Debe contener minimo 5 caracteres",
    })
    .max(15, {
      message: "Debe contener un maximo de 15 caracteres",
    }),
});

export const TypeRecuperarContrasena = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email no válido",
    }),
});

export type SchemaLogin = z.infer<typeof TypeLogin>;

export type SchemaRecuperarContrasena = z.infer<typeof TypeRecuperarContrasena>;
