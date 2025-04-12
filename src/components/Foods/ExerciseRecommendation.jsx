import React, { useState } from 'react';

function ExerciseRecommendation() {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [recommendations, setRecommendations] = useState('');

  // Function to calculate BMI and provide exercise recommendations
  const getExerciseRecommendations = () => {
    if (weight && age && bmi) {
      let exerciseList = '';

      // Determine exercise recommendations based on BMI
      if (bmi < 18.5) {
        exerciseList = 'For underweight individuals, focus on strength training and muscle building. Recommended exercises include:\n💪 Weightlifting (Squats, Deadlifts, Bench Press)\n🤸 Bodyweight exercises (Push-ups, Pull-ups)\n🛠 Resistance band workouts.';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        exerciseList = 'For individuals with normal weight, a balanced mix of cardio and strength training is ideal. Recommended exercises include:\n🏃‍♂️ Running or Jogging\n🏊‍♀️ Swimming\n🏋️ Weightlifting (Squats, Deadlifts, Bench Press)\n🧘 Yoga for flexibility.';
      } else if (bmi >= 25 && bmi <= 29.9) {
        exerciseList = 'For overweight individuals, focus on moderate-intensity cardio and strength training. Recommended exercises include:\n🚶‍♂️ Walking or Jogging\n🚴‍♀️ Cycling\n🤸 Bodyweight exercises (Squats, Lunges, Push-ups)\n💪 Light Weightlifting.';
      } else {
        exerciseList = 'For obese individuals, focus on low-impact exercises to avoid injury and burn calories. Recommended exercises include:\n🚶‍♀️ Walking or Power Walking\n🏊‍♂️ Swimming (low-impact cardio)\n🚴‍♂️ Cycling\n🪑 Chair exercises or Resistance Bands for strength training.';
      }

      setRecommendations(exerciseList);
    } else {
      alert("Please enter weight, age, and BMI.");
    }
  };

  return (
    <div className="exercise-container">
      <h2>Exercise Recommendation Based on BMI</h2>
      <div className="warning-text" style={{ color: '#FCB454', marginBottom: '20px' }}>
        <p><strong>Warning:</strong> This tool is not recommended for sick people or those with underlying health conditions.</p>
      </div>
      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
        />
      </div>
      <div className="input-group">
        <label htmlFor="age">Age (years):</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
      </div>
      <div className="input-group">
        <label htmlFor="bmi">BMI:</label>
        <input
          type="number"
          id="bmi"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          placeholder="Enter BMI"
        />
      </div>
      <button onClick={getExerciseRecommendations} >Get Exercise Recommendations</button>

      {recommendations && (
        <div className="recommendations">
          <h3 className='mb1'>Recommended Exercises:</h3>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}

export default ExerciseRecommendation;
