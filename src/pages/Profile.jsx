import UserProfile from "../components/Profile/UserProfile"
import Sidebar from "../components/Reusable/Sidebar"

export default function Profile() {

    return (
        <div className="main">
            <Sidebar />
            <UserProfile />
        </div>
    )
}