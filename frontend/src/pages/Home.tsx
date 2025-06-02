import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

function Home() {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-svh">
      <div className=" px-4   flex items-center justify-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full  h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
