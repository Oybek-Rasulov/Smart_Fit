import { createContext, useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";

// Create a context to manage trainers
export const TrainersContext = createContext();

export function TrainersProvider({ children }) {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    async function getTrainers() {
      try {
        const response = await axios.get("https://smartfitbackend.onrender.com/trainers");
        setTrainers(response.data); // Store trainer data in state
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    }

    getTrainers();
  }, []); // Empty dependency array means this runs once on mount

  // Memoize trainers value to optimize rendering
  const trainersValue = useMemo(() => ({ trainers }), [trainers]);

  return (
    <TrainersContext.Provider value={trainersValue}>
      {children}
    </TrainersContext.Provider>
  );
}

// Custom hook to access trainers data
export function useTrainers() {
  return useContext(TrainersContext); // Access the trainers context value
}
