import { create } from "zustand";

interface IUseAuth {
  isAuthenticated: boolean;
  setIsAuthenticated: (data: boolean) => void;
}

export const useAuth = create<IUseAuth>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (data: boolean) => set({ isAuthenticated: data }),
}));
