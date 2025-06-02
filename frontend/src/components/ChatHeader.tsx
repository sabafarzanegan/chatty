import { CloseCircle } from "iconsax-reactjs";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex items-center justify-between w-full ">
      <div className="flex items-center gap-x-4 ">
        <div>
          <img
            src={selectedUser?.profilePic || "./avatar.png"}
            alt="profilePic"
            className="w-10 h-10"
          />
        </div>
        <div>
          <p className="text-primary font-semibold">{selectedUser?.fullName}</p>
          {onlineUsers?.includes(selectedUser?._id as string)
            ? "online"
            : "offline"}
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => setSelectedUser(null)}>
        <CloseCircle />
      </div>
    </div>
  );
}

export default ChatHeader;
