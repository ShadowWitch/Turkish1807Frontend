import { z } from "zod";

export const TypeRegisterChequeo = z.object({
  //* Chequeos
  estatura: z.string(),
  nivelDeGrasa: z.string(),
  nivelDeMasa: z.string(),
  peso: z.string(),

  id_cliente: z.string(),
  // fechaDelChequeo: z.string(),
});

export type SchemaRegisterChequeo = z.infer<typeof TypeRegisterChequeo>;
