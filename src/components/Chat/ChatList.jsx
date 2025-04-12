import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrainers } from "../../context/TrainersContext";
import assets from "../assets";

const ChatList = () => {
  const { trainers } = useTrainers(); // Access the trainers data from context
  const [selectedTrainer, setSelectedTrainer] = useState(null); // Track selected trainer
  const navigate = useNavigate();

  const handleClick = (trainerId) => {
    // Set the selected trainer
    setSelectedTrainer(trainerId);
    // Navigate to the ChatContent page with the trainerId
    navigate(`/chat/${trainerId}`);
  };

  return (
    <div className="chatlist-container">
      <h3>Trainers</h3>

      {/* Check if trainers are available */}
      {trainers.length === 0 ? (
        <p>Loading trainers...</p> // Show loading if no trainers are available
      ) : (
        trainers.map((trainer, i) => (
          <div
            key={i} // Ensure each item has a unique key
            className={`chatlist-item ${selectedTrainer === trainer.trainerid ? "selected" : ""}`} // Apply 'selected' class if this trainer is clicked
            onClick={() => handleClick(trainer.trainerid)} // Navigate to chat with the selected trainer
          >
            <img
              src={trainer.profilePicture || assets.profile}
              alt={trainer.name}
              className="trainer-avatar"
            />
            <div className="trainer-info">
              <h4>{trainer.name}</h4>
              <p>{trainer.lastMessage || 'No messages yet'}</p> {/* Display the last message if available */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;
