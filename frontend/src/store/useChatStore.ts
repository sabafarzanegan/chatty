import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import type { MessageType } from "../types";

type chatStoreType = {
  messages: MessageType[];
  users: {
    createdAt: Date;
    email: string;
    fullName: string;
    profilePic: string | undefined;
    updatedAt: string;
    __v: number;
    _id: string;
  }[];
  selectedUser: {
    createdAt: Date;
    email: string;
    fullName: string;
    profilePic: string | undefined;
    updatedAt: string;
    __v: number;
    _id: string;
  } | null;
  getUsers: () => void;
  getMessages: (userId: string | undefined) => void;
  sendMessage: (messageData: { image?: string; text: string }) => void;
  setSelectedUser: (
    user: {
      createdAt: Date;
      email: string;
      fullName: string;
      profilePic: string | undefined;
      updatedAt: string;
      __v: number;
      _id: string;
    } | null
  ) => void;
};

export const useChatStore = create<chatStoreType>()((set, get) => ({
  messages: [],
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
  getMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
