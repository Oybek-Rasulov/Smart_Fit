import Search from "../Reusable/Search"
import Title from "../Reusable/Title"
import User from "../Reusable/User"
import Content from "./Content"
import {useData} from "../../context/Context";

function News() {
    const {searchData} = useData();

    return (
        <div className="news container">
            <div className="account-container">
                <Search />
                <User />
            </div>
            <Title title="Advices" />
            <div className="scroll">
                {searchData.map((item, index) => {
                    return <Content key={index} newsid={item.newsid} title={item.title} image={item.image} content={item.content} />
                })}
            </div>
        </div>
    )
}

export default News
