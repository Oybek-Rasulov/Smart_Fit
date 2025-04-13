import React, { useState, useEffect } from "react";
import ChatList from '../components/Chat/ChatList';
import ChatContent from '../components/Chat/ChatContent';
import axios from "axios";

const ChatApp = () => {
  const [trainers, setTrainers] = useState([]);

  // Fetch trainers list from backend
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get("https://smartfitbackend.onrender.com/api/trainers");
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="chat-app">
      <div className="chatlist">
        <ChatList trainers={trainers} />
      </div>
      <div className="chat-content">
        <ChatContent />
      </div>
    </div>
  );
};

export default ChatApp;
