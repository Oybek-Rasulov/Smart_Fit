import Menu from "../components/Foods/Menu"
import Footer from "../components/Reusable/Footer"
import Sidebar from "../components/Reusable/Sidebar"

function HealthyFoods() {
    return (
        <div className="main">
            <Sidebar />
            <div className="w-100 scroll-second">
                <Menu />
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default HealthyFoods