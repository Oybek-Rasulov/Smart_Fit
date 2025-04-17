import ChatContainer from "../components/chatGroup/ChatContainer"
import Footer from "../components/Reusable/Footer"
import Sidebar from "../components/Reusable/Sidebar"
import { useAuth } from "../context/AuthContext"

function ChatCommunity() {
    const { providerValue } = useAuth();
    const user = providerValue.user;

    return (
        <div className="main">
            <Sidebar />
            <div className="w-100 p1">
                <ChatContainer userId={user?.userid} />
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default ChatCommunity