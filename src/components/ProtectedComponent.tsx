import React, { type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
  permissions: string[];
  children: ReactNode;
}

export const ProtectedComponent = ({ permissions = [""], children }: Props) => {
  const { isLoading, status, token, user, setIsAuthenticated } = useAuth();

  const dataUser: Data = user;

  const permisos: string[] = dataUser.roles.relPermisosRoles.map(
    (e, index) => e.permisos.acciones
  );

  console.log("PERMISOS >> ", permisos);
  console.log("PERMISSSSSIONNN >> ", permissions);

  const verifyPermissions = (arr1: string[], arr2: string[]) => {
    return arr2.some((item) => arr1.includes(item));
  };
  if (!verifyPermissions(permisos, permissions)) return;

  return children;
};

// Generated by https://quicktype.io

export interface Data {
  id: string;
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  ultimaConexion: string;
  imagenPerfil: string;
  estado: string;
  id_role: string;
  createdAt: string;
  updatedAt: string;
  roles: Roles;
}

export interface Roles {
  id: string;
  nombre: string;
  descripcion: string;
  relPermisosRoles: RelPermisosRole[];
}

export interface RelPermisosRole {
  id: string;
  id_role: string;
  id_permiso: string;
  permisos: Permisos;
}

export interface Permisos {
  id: string;
  nombre: string;
  descripcion: string;
  acciones: string;
  createdAt: string;
  updatedAt: string;
}
