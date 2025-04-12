import { Link } from "react-router" 
import assets from "../assets"

function TItem({id, name, image, status, uzb, rus, rating}) {
    return (
        <Link to={`/tprofile/${id}`}>
                    <div className="t-list">
                        <div className="tf">
                            <img src={image ? image : assets.profile} alt="trainer" />
                            <h4>{name ? name : "Treyner"}</h4>
                        </div>
                        <div className="tt">
                            <p className="mr1">Languages:</p>
                            {uzb && <img className="icon mr1" src={assets.uzb} alt="uzb" />}
                            {rus && <img className="icon" src={assets.rus} alt="rus" />}
                        </div>
                        <div className="ts">
                            <p className="mr1">{rating}</p>
                            <img className="icon mr2" src={assets.star} alt="rate" />
                            <p className="mr1">{status ? "Active" : "Not Active"}</p>
                            <div className={`t-status ${status ? "green" : "red"}`}></div>
                        </div>
                    </div>
                </Link>
    )
}

export default TItem
