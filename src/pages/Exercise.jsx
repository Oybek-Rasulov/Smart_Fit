import ExerciseRecommendation from "../components/Foods/ExerciseRecommendation"
import Menu from "../components/Foods/Menu"
import Sidebar from "../components/Reusable/Sidebar"

function Exercise() {
    return (
        <div className="main">
            <Sidebar />
            <div className="w-100 scroll-second">
                <ExerciseRecommendation />
            </div>
        </div>
    )
}

export default Exercise
