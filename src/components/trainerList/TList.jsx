import React, { useState, useEffect } from "react";
import Search from "../Reusable/Search";
import User from "../Reusable/user";
import Title from "../Reusable/Title";
import { useTrainers } from "../../context/TrainersContext"; // Use the custom hook to access context
import TItem from "./TItem";
import axios from "axios";

export default function TList() {
  const { trainers } = useTrainers(); // Access trainers directly from the context
  const [selectedGoal, setSelectedGoal] = useState("");
  const [ratings, setRatings] = useState({}); // Store ratings by trainer ID

  // Goals for filtering
  const goals = [
    "All",
    "lose weight",
    "muscle gain",
    "flexibility",
    "general fitness",
    "rehabilitation",
  ];

  const handleFilterChange = (e) => {
    setSelectedGoal(e.target.value);
  };

  // Fetch ratings for trainers
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/trainers/ratings");
  
        // Log the response data to see its structure
        console.log("Response data:", res.data);
  
        // Check if the response data is in the correct format
        const ratingsData = res.data.reduce((acc, { trainer_id, avgrating }) => {
          if (trainer_id && avgrating) { // Check if trainer_id and avgrating exist
            // Convert the avgrating value to a float and round it to 1 decimal place
            const formattedRating = parseFloat(avgrating).toFixed(1);
            acc[trainer_id] = formattedRating; // Store formatted rating using trainer_id
          } else {
            console.warn('Invalid data for trainer_id:', trainer_id, 'or avgrating:', avgrating);
          }
          return acc;
        }, {});
  
        // Set the formatted ratings data into the state
        setRatings(ratingsData);
        console.log('Formatted ratings data:', ratingsData); // Check formatted ratings data
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
  
    fetchRatings(); // Call the function to fetch ratings
  }, [trainers]); // Dependency on trainers to refetch if trainer data changes
  

  // Filter logic
  const filteredTrainers =
    selectedGoal === "" || selectedGoal === "All"
      ? trainers
      : trainers.filter((trainer) =>
          trainer.directions?.includes(selectedGoal)
        );

  return (
    <div className="news container">
      <div className="account-container">
        <Search />
        <User />
      </div>

      <Title title="Trainers" className="mb1" />

      {/* 🔽 Goal Filter Dropdown */}
      <div className="mb1">
        <label style={{ fontWeight: "bold" }}>Filter by Goal: </label>{" "}
        <select className="tfilter" value={selectedGoal} onChange={handleFilterChange}>
          {goals.map((goal) => (
            <option key={goal} value={goal}>
              {goal.charAt(0).toUpperCase() + goal.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Loading state check */}
      {trainers.length === 0 ? (
        <div>Loading trainers...</div>
      ) : (
        <div className="t-content scroll">
          {filteredTrainers.map((trainer, index) => (
            <TItem
              key={index}
              id={trainer.trainerid}
              name={trainer.name}
              image={trainer.image}
              status={trainer.status}
              uzb={trainer.uzb}
              rus={trainer.rus}
              rating={ratings[trainer.trainerid] || 0} // Passing rating for each trainer
            />
          ))}
        </div>
      )}
    </div>
  );
}

