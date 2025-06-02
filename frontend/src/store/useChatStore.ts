import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import type { MessageType, User } from "../types";
import { useAuthStore } from "./useAuthStore";

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
  setSelectedUser: (user: User | null) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
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
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage: MessageType) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
