import { z } from "zod";

export const signUpFormValidation = z.object({
  fullName: z.string().min(2, "enter a name including atleast two character"),
  email: z.string().email("This is not a valid email"),
  password: z.string().min(6, "atleast 6 character"),
});

export const LoginFormValidation = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(6, "atleast 6 character"),
});

export type MessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type User = {
  createdAt: Date;
  email: string;
  fullName: string;
  profilePic: string | undefined;
  updatedAt: string;
  __v: number;
  _id: string;
};

export function formatMessageTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
