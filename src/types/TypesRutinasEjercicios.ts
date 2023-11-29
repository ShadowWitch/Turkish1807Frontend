import { z } from "zod";
export const TypeRegisterRutina = z.object({
  nombre: z.string({
    required_error: "El nombre de la rutina es requerido",
  }),
  descripcion: z.string().optional(),
});

export const TypeAsignarEjercicioARutina = z.object({
  id_rutina_entrenamiento: z.object({
    label: z.string(),
    id: z.string(),
    value: z.string(),
  }),

  nombre: z.string({
    required_error: "Nombre del ejercicio requerido",
  }),

  repeticiones: z.string({
    required_error: "Campo requerido",
  }),

  series: z.string({
    required_error: "Campo requerido",
  }),
});

export const TypeAsignarRutinaCliente = z.object({
  id_rutina: z.object({
    label: z.string(),
    id: z.string(),
    value: z.string(),
  }),

  id_cliente: z.string(),
});

export type SchemaRegisterRutina = z.infer<typeof TypeRegisterRutina>;

export type SchemaAsignarEjercicioRutina = z.infer<
  typeof TypeAsignarEjercicioARutina
>;

export type SchemaAsignarRutinaCliente = z.infer<
  typeof TypeAsignarRutinaCliente
>;
