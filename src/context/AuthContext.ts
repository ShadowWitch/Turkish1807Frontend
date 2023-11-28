import { create } from "zustand";

type Store = {
  token: string | null;
  user: User | null;
  status: "checking" | "authenticated" | "not-authenticated";
  isLoading: boolean;
  setIsAuthenticated: ({
    token,
    user,
    status,
  }: {
    token: string;
    user: User | null;
    status?: "checking" | "authenticated" | "not-authenticated";
  }) => void;
};

export const useAuth = create<Store>((set) => ({
  status: "not-authenticated",
  token: null,
  user: null,
  isLoading: false,
  setIsAuthenticated: ({ status, token, user }) =>
    set({
      status,
      token,
      user,
    }),
}));

export interface User {
  id: string;
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  ultimaConexion: string;
  imagenPerfil: string;
  estado: string;
  id_rel_role: string;
  createdAt: string;
  updatedAt: string;
  relPermisosRoles: RelPermisosRoles;
}

export interface RelPermisosRoles {
  id: string;
  id_role: string;
  id_permiso: string;
  permisos: Permisos;
  roles: Roles;
}

export interface Permisos {
  id: string;
  nombre: string;
  descripcion: string;
  acciones: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Roles {
  id: string;
  nombre: string;
  descripcion: string;
}
