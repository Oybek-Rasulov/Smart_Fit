import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ChatContent() {
  const { trainerid } = useParams(); // Access the trainerId from the URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://smartfitbackend.onrender.com/api/messages/${trainerid}`);
        setMessages(response.data); // Store messages in state
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (trainerid) {
      fetchMessages(); // Fetch messages when the component mounts or trainerId changes
    }
  }, [trainerid]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
  
    if (message.trim() === '') return;
  
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.userid : null;
  
    if (!userId) {
      console.error('User ID is missing!');
      return;
    }
  
    try {
      const response = await axios.post('https://smartfitbackend.onrender.com/api/messages', {
        trainerId: trainerid,
        message,
        userId, // Include userId from localStorage
      });
  
      // Update chat messages with the new response
      setMessages([...messages, response.data]); // Add new message to the chat
      setMessage(''); // Clear message input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  

  return (
    <div className="chat-container">
      <h2>Chat with Trainer</h2>
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'trainer-message'}`}>
            <p>{msg.message}</p>
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="send-message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatContent;
