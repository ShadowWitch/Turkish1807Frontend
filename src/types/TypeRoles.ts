import { z } from "zod";

export const TypeRegisterRol = z.object({
  nombre: z.string().trim().min(3).max(13),
  descripcion: z.string().trim().min(5).max(13),
});

export const TypeAsignarRolUsuario = z.object({
  id_rol: z.object({
    label: z.string(),
    id: z.string(),
    value: z.string(),
  }),

  id_usuario: z.string(),
});

export type SchemaRegisterRol = z.infer<typeof TypeRegisterRol>;
export type SchemaAsignarRolUsuario = z.infer<typeof TypeAsignarRolUsuario>;
