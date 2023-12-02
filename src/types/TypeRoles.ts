import { z } from "zod";

export const TypeRegisterRol = z.object({
  nombre: z.string().trim().min(3).max(13),
  descripcion: z.string().trim().min(5).max(13),
});

export type SchemaRegisterRol = z.infer<typeof TypeRegisterRol>;
