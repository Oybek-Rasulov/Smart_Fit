function Messages({item}) {
    return (
        <>
            <p className={`message ${item?.sender === 'user' ? 'sender' : 'receiver'}`}>{item.chat} <span className="chat-time">12:00 PM</span></p>
        </>
    )
}

export default Messages
