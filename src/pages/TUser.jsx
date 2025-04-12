import Sidebar from "../components/Reusable/Sidebar"
import TEditProfile from "../components/TrainerProfile/TEditProfile"

export default function TUser() {

    return (
        <div className="main">
            <Sidebar />
            <TEditProfile />
        </div>
    )
}