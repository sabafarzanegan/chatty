import { CloseCircle } from "iconsax-reactjs";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

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
          <span className="text-sm">Online</span>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => setSelectedUser(null)}>
        <CloseCircle />
      </div>
    </div>
  );
}

export default ChatHeader;
