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

export const TypeRegisterUser = z.object({
  nombre: z
    .string({
      required_error: "Campo requerido",
    })
    .trim()
    .min(5, {
      message: "Debe contener minimo 5 caracteres",
    }),

  contrasena: z
    .string({
      required_error: "Campo requerido",
    })
    .trim()
    .min(5, {
      message: "Debe contener minimo 5 caracteres",
    }),

  repetirContrasena: z
    .string({
      required_error: "Campo requerido",
    })
    .trim()
    .min(5, {
      message: "Debe contener minimo 5 caracteres",
    }),
  // repetirContrasena: z
  //   .string()
  //   .trim()
  //   .refine(
  //     (repetirContrasena, data) => {
  //       // Validación personalizada: La contraseña y la repetición de la contraseña deben ser iguales
  //       return repetirContrasena === data.contrasena;
  //     },
  //     {
  //       message: "Las contraseñas no coinciden",
  //     }
  //   ),
});

export type SchemaRegisterUser = z.infer<typeof TypeRegisterUser>;
