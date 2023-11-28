import { z } from "zod";

export const TypeRegisterCliente = z.object({
  DNI: z.string().trim().min(13).max(13),
  // fechaDeIngreso: z.string(),
  fechaNacimiento: z.string(),
  // id_municipio: z.number(),
  //   otroNombre: z.string(),
  nombreCompleto: z
    .string()
    .trim()
    .min(10, {
      message: "El nombre completo debe tener minimo 10 caracteres",
    })
    .max(30, {
      message: "El nombre completo debe tener maximo 30 caracteres",
    }),
  //   primerApellido: z.string().trim().min(1),
  //   primerNombre: z.string().trim().min(1),
  //   segundoApellido: z.string().trim().min(1),
  //   segundoNombre: z.string().trim().min(1),
  telefono: z.string().trim().min(1),

  //* Chequeos
  estatura: z.string(),
  nivelDeGrasa: z.string(),
  nivelDeMasa: z.string(),
  peso: z.string(),
  // fechaDelChequeo: z.string(),
});

export type SchemaRegisterCliente = z.infer<typeof TypeRegisterCliente>;
