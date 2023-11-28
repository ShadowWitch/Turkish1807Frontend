import { z } from "zod";

const isValidDate = (value: string): boolean => {
  const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
  return dateRegex.test(value);
};

export const TypeRegisterContrato = z.object({
  descripcion: z.string().optional(),
  fechaDeInicio: z
    .string({
      required_error: "La fecha de inicio es requerida",
    })
    .refine(isValidDate, {
      message: "Formato de fecha no válida",
    }),
  fechaDeFin: z
    .string({
      required_error: "La fecha de vencimiento es requerida",
    })
    .refine(isValidDate, {
      message: "Formato de fecha no válida",
    }),

  id_cliente: z.string(),
});
export type SchemaRegisterContrato = z.infer<typeof TypeRegisterContrato>;
