import { create } from "zustand";

type AuthState = {
  user: null | { id: string; email: string; name?: string; lastName?: string };
  token: string | null;
  login: (user: { id: string; email: string }, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
