import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

type Store = {
  authUser: {
    createdAt: Date;
    email: string;
    fullName: string;
    profilePic: string | undefined;
    updatedAt: Date;
    __v: number;
    _id: string;
  } | null;
  isCheckingAuth: boolean;

  isUpdatingProfile: boolean;
  checkAuth: () => void;
  signUp: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logOut: () => void;
  login: (data: { email: string; password: string }) => void;
  updateProfile: (data: { profilePic: string }) => void;
};

export const useAuthStore = create<Store>()((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      if (!res.data) {
        return null;
      }
      return res.data;
    } catch (error) {
      console.log("error in checking user");
      console.log(error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup/", data);
      set({ authUser: res.data });
      if (res.data) {
        return { success: true, message: "signup successfully" };
      }
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
      return { success: false, message: "signup failed" };
    }
  },
  logOut: () => {},
  login: () => {},
  updateProfile: () => {},
}));
