import assets from "../assets"
import { Link } from "react-router"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useSocial } from "../../context/SocialContext";

function Comments({date, newsid, getOpenComment}) {
    const {providerValue} = useAuth();
    const {socialValue} = useSocial();
    const [like, setLike] = useState(0);

    // const userLike = socialValue.likes.filter((like) => like.newsid === newsid && socialValue.userid === like.userid); 
    // console.log(userLike.length)

    useEffect(() => {
        async function storeLike() {
            try {
                // if(userLike.length > 0) setLike(false)
                const response = await axios.post("https://smartfitbackend.onrender.com/like", {like: like, newsid: newsid, phone: providerValue.user});
                socialValue.setResponse(response.data.message)
                socialValue.setUserId(response.data.userid)
            } catch (error) {
                console.error(error);
            }
        }

        storeLike();
    }, [like])

    const publishedDate = new Date(date);
    const year = publishedDate.getFullYear(); 
    const month = String(publishedDate.getMonth() + 1).padStart(2, "0");
    const day = String(publishedDate.getDate()).padStart(2, "0");

    function handleLike() {
        setLike((current) => !current);
    }

    function handleComment() {
        getOpenComment()
    }

    const commentLength = socialValue.dataComment.filter((comment) => comment.newsid === newsid);
    const likesLength = socialValue.likes?.filter((like) => like.newsid === newsid) || [];
    const userLiked = socialValue.likes?.filter((like) => like.newsid === newsid && socialValue.userid === like.userid); 

    return (
        <div className="news-details">
            {providerValue.user ? <div className="like-comment">
                <button className="like-btn" onClick={handleLike}>
                    {userLiked.length > 0 ? <img className="icon" src={assets.liked} alt="liked" /> : <img className="icon" src={assets.like} alt="like" />}
                    <p>{likesLength.length}</p>
                </button>
                <button className="comment-btn" onClick={handleComment}>
                    <img className="icon" src={assets.comment} alt="comment" />
                    <p>{commentLength.length}</p>
                </button>
            </div> : 
            <Link to="login">
            <div className="like-comment">
                <button className="like-btn">
                    {like ? <img className="icon" src={assets.liked} alt="liked" /> : <img className="icon" src={assets.like} alt="like" />}
                    <p>{likesLength.length}</p>
                </button>
                <button className="comment-btn">
                    <img className="icon" src={assets.comment} alt="comment" />
                    <p>{commentLength.length}</p>
                </button>
            </div>
        </Link>}
            <p>{`${year}-${month}-${day}`}</p>
        </div>
    )
}

export default Comments
