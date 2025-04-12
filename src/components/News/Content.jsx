import assets from "../assets"

function Content({title, content, newsid, image}) {
 
    return (
        <>
            <div className="news-content mb2">
                <img className="content-image" src={image} alt="honey" />
                <div className="news-text">
                    <div>
                        <h3 className="mb1">{title}</h3>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content
