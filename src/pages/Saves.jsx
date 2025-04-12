import { useSocial } from "../context/SocialContext"
import Sidebar from "../components/Reusable/Sidebar"
import SaveContent from "../components/save/SaveContent";
import Title from "../components/Reusable/Title";

export default function Saves() {
    const { socialValue } = useSocial();

    return (
        <div className="main">
            <Sidebar />
            <div className="news container">
                <Title title="Saqlanganlar" />
                <div className="scroll">
                    {socialValue.save.map((s, index) => <SaveContent  key={index} newsid={s.newsid} title={s.title} content={s.content} />)}
                </div>
            </div>
        </div>
    )
}
