import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import type { User } from "../types";
import { io } from "socket.io-client";
type Store = {
  authUser: User | null;
  isCheckingAuth: boolean;
  isUpdatingProfile: boolean;
  onlineUsers: string[] | null;
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
  connectSocket: () => void;
  disConnectSocket: () => void;
  socket: any;
};

export const useAuthStore = create<Store>()((set, get) => ({
  authUser: null,
  socket: null,
  onlineUsers: null,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      if (!res.data) {
        return null;
      }
      get().connectSocket();
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
      get().connectSocket();

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
      get().disConnectSocket();
      return { success: true, message: "login successfully" };
    } catch (error: any) {
      toast.error(error.response.data.message);
      return { success: false, message: "login failed" };
    }
  },

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
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:5001", {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
