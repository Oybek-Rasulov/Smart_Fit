import React, { useState } from 'react';

function Menu() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [foodRecommendation, setFoodRecommendation] = useState('');

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);

      // Determine BMI category
      let categoryText = '';
      let foodList = '';
      
      if (calculatedBMI < 18.5) {
        categoryText = 'Underweight';
        foodList = 'We recommend eating more hearty foods like plov (pilaf), lagman (noodle soup), and samsa (savory pastry) to gain weight.';
      } else if (calculatedBMI >= 18.5 && calculatedBMI <= 24.9) {
        categoryText = 'Normal weight';
        foodList = 'Great! For maintaining a healthy weight, you can enjoy foods like shashlik (grilled meat skewers), manti (dumplings), and salads with fresh vegetables.';
      } else if (calculatedBMI >= 25 && calculatedBMI <= 29.9) {
        categoryText = 'Overweight';
        foodList = 'To manage weight, try focusing on lighter foods like vegetable-based soups (kuurdak), salads, and fruits. Avoid heavy carbs and fried foods.';
      } else {
        categoryText = 'Obese';
        foodList = 'For weight loss, consider foods like steamed fish, vegetable salads, and avoiding high-calorie dishes like plov and fried food. Try to include more greens and fruits.';
      }

      setCategory(categoryText);
      setFoodRecommendation(foodList);
    }
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>

      {/* Warning text */}
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
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height"
        />
      </div>
      <button onClick={calculateBMI} className="t-btn">Calculate BMI</button>

      {bmi && (
        <div className="result">
          <p>Your BMI: {bmi}</p>
          <p>Category: {category}</p>
          <p><strong>Recommended Foods:</strong> {foodRecommendation}</p>
        </div>
      )}
    </div>
  );
}

export default Menu;


