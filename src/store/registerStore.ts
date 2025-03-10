import { create } from "zustand";

type AuthState = {
  user: { firstName: string; lastName: string; email: string } | null;
  isAuthenticated: boolean;
  setUser: (user: { firstName: string; lastName: string; email: string }) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
