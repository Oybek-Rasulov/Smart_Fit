import News from "../components/News/news"
import Footer from "../components/Reusable/Footer"
import Sidebar from "../components/Reusable/Sidebar"

function Home() {
    return (
        <div className="main">
            <Sidebar />
            <div className="w-100">
                <News />
                <Footer />
            </div>
        </div>
    )
}

export default Home
