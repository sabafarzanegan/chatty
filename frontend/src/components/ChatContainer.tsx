import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import { formatMessageTime } from "../types";
import { MessageSquare } from "iconsax-reactjs";

function ChatContainer() {
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const { isPending } = useQuery({
    queryKey: ["messages", selectedUser?._id],
    queryFn: () => getMessages(selectedUser?._id),
    enabled: !!selectedUser?._id,
  });

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isPending) {
    return (
      <div className="px-6 w-full flex flex-col flex-1">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="px-6 w-full flex flex-col flex-1">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!messages.length && (
          <div className="max-w-md text-center space-y-6 mx-auto">
            {/* Icon Display */}
            <div className="flex justify-center gap-4 mb-4">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
                     justify-center animate-bounce">
                  <MessageSquare className="w-8 h-8 text-primary " />
                </div>
              </div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl font-bold">
              {" "}
              {`Welcome to chatt with ${selectedUser?.fullName} !`}
            </h2>
            <p className="text-base-content/60">start the chat</p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}>
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
