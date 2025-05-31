import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

type chatStoreType = {
  message: {
    id: string;
    text: string;
  }[];
  users: {
    createdAt: Date;
    email: string;
    fullName: string;
    profilePic: string | undefined;
    updatedAt: string;
    __v: number;
    _id: string;
  }[];
  selectedUser: null;
  getUsers: () => void;
  getMessages: () => void;
};

export const useChatStore = create<chatStoreType>()((set) => ({
  message: [],
  users: [],
  selectedUser: null,
  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getMessages: () => {},
}));
