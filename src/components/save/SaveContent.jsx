import assets from "../assets";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useSocial } from "../../context/SocialContext";

function SaveContent({newsid, title, content}) {
    const { providerValue } = useAuth();
    const { socialValue } = useSocial();

    async function deleteSave() {
        await axios.post("http://localhost:3001/deletesave", {phone: providerValue.user, newsid: newsid})
            .then(res => socialValue.setResponse(res.data.message));
    }

    return (
        <div className="news-content mb2">
            <img className="content-image" src={assets.honey} alt="honey" />
            <div className="news-text">
                <div>
                    {providerValue.user && <button onClick={deleteSave} className="save-content"><img className="icon" src={assets.fullSave} alt="save" /></button>}
                    <h3 className="mb1">{title}</h3>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}

export default SaveContent
