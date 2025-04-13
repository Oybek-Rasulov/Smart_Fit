import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function RatingSize({ handleReviewSubmit, trainerid }) {
  const [ratingValue, setRatingValue] = React.useState(2);  // Default value is 2
  const [userId, setUserId] = React.useState(null); // Store the logged-in user's ID
  
  // Fetch user ID from localStorage or any state management solution
  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserId(userData.userid); // Set the user ID from localStorage
    }
  }, []);

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);  // Update the local rating value
  };

  // Handle the rating submission
  const handleSubmitRating = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData ? userData.userid : null; // Ensure userId is fetched correctly
    console.log(userId)
    if (!userId) {
      console.error('User ID is missing!');
      return;
    }
  
    try {
      // Send the rating to the backend along with trainer ID and user ID
      const response = await axios.post('https://smartfitbackend.onrender.com/submitRating', {
        trainerId: trainerid,  // Trainer ID
        userId: userId,        // User ID
        rating: ratingValue,   // Rating value
      });
  
      // Update the displayed average rating
      handleReviewSubmit(response.data.newAverageRating);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  
  
  

  return (
    <Stack spacing={1}>
      <Rating 
        name="trainer-rating"
        value={ratingValue} 
        defaultValue={2} 
        size="large" 
        onChange={handleRatingChange}  // Capture the rating change
      />
      <div>Your selected rating: {ratingValue}</div>  {/* Display selected rating */}
      
      <button onClick={handleSubmitRating} className="back-link">Submit Rating</button> {/* Submit button */}
    </Stack>
  );
}
