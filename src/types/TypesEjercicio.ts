import { z } from "zod";
export const TypeRegisterEjercicio = z.object({
  descripcion: z.string().trim().min(3),
  nombre: z.string().trim().min(3),
  id_tipo: z.string().trim().min(3),
});
export type SchemaRegisterEjercicio = z.infer<typeof TypeRegisterEjercicio>;
