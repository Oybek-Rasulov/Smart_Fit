import assets from "../assets"
import { useData } from "../../context/Context"

function Search() {

    const {setSearchedNews, searchedNews} = useData();

    return (
        <div className="search">
            <form className="search-form">
                <input type="search" className="search-input" placeholder="Qidiruv..." value={searchedNews} onChange={(e) => setSearchedNews(e.target.value)} />
                <img src={assets.search} alt="search" className="search-icon icon" />
            </form>
        </div>
    )
}

export default Search
