import { create } from "zustand";

type Store = {
  authUser: {
    name: string;
    email: string;
  } | null;
  isCheckingAuth: boolean;
  isLoging: boolean;
  isSignup: boolean;
  isUpdatingProfile: boolean;
  checkAuth: () => void;
  signUp: (data: { fullName: string; email: string; password: string }) => void;
  logOut: () => void;
  login: (data: { email: string; password: string }) => void;
  updateProfile: (data: { profilePic: string }) => void;
};

export const useAuthStore = create<Store>()((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoging: false,
  isSignup: false,
  isUpdatingProfile: false,
  checkAuth: async () => {},
  signUp: async () => {},
  logOut: () => {},
  login: () => {},
  updateProfile: () => {},
}));
