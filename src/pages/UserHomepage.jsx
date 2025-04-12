import News from "../components/News/news"
import Sidebar from "../components/Reusable/Sidebar"

function Home() {
    return (
        <div className="main">
            <Sidebar />
            <News />
        </div>
    )
}

export default Home;