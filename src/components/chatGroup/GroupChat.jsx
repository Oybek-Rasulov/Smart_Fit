import React, { useEffect, useState } from 'react';
import assets from '../assets';
import Title from '../Reusable/Title';

export default function GroupChat({ groupId, userId }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const fetchMessages = async () => {
    const res = await fetch(`https://smartfitbackend.onrender.com/api/chat-groups/${groupId}/messages`);
    const data = await res.json();
    setMessages(data);
    console.log(data)
  };
  

  useEffect(() => {
    if (groupId) fetchMessages();
  }, [groupId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    await fetch(`https://smartfitbackend.onrender.com/api/chat-groups/${groupId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message: messageInput })
    });

    setMessageInput('');
    await fetchMessages(); // reload messages after sending
  };

  const formatUzDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      timeZone: 'Asia/Tashkent',
      day: '2-digit',
      month: 'short', // Still using short month, but fallback in case it fails
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    // Try locale formatting, then fallback
    try {
      return date.toLocaleString('en-GB', options); // 'en-GB' works reliably
    } catch {
      // Fallback manual format
      const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
  };
  

  return (
    <div className="group-chat">
      <div className="chat-window">
        <Title title="Please Support Each Other" className="mb2" />
        {messages.map(msg => (
            <div key={msg.message_id} className="chat-bubble">
                <div><strong>{msg.name}</strong>: {msg.message}</div>
                <small className="msg-time">{formatUzDate(msg.created_at)}</small>
            </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit"><img src={assets.telegram} alt="icon" className='icon' /></button>
      </form>
    </div>
  );
}

