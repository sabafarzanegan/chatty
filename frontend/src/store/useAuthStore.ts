import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

type Store = {
  authUser: {
    createdAt: Date;
    email: string;
    fullName: string;
    profilePic: string | undefined;
    updatedAt: string;
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
  login: (data: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  updateProfile: ({ profilePic }: { profilePic: string }) => void;
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
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  },
  logOut: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      console.log(res);
      console.log("logout");

      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("login successfully");
      return { success: true, message: "login successfully" };
    } catch (error: any) {
      toast.error(error.response.data.message);
      return { success: false, message: "login failed" };
    }
  },
  // updateProfile: async (data) => {
  //   try {
  //     set({ isUpdatingProfile: true });
  //     const res = await axiosInstance.post("/auth/update-profile", data);
  //     set({ authUser: res.data });
  //     toast.success("image was changed successfully");
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.response.data.message);
  //   } finally {
  //     set({ isUpdatingProfile: false });
  //   }
  // },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
