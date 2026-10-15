import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  // El backend puede no devolver rol en /login; Header usa "Sin rol".
  role?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
