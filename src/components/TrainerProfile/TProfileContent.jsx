import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import assets from "../assets";
import User from "../Reusable/User"; 
import axios from "axios";
import RatingSize from "../Reusable/RatingSize";

function TProfileContent() {
  const [trainer, setTrainer] = useState([{}]);
  const [avgRating, setAvgRating] = useState(0);
  const { trainerid } = useParams(); // Access trainerid from URL params

  useEffect(() => {
    if (!trainerid) return;
  
    const getTrainer = async () => {
      try {
        const response = await axios.post("https://smartfitbackend.onrender.com/trainer", { trainerid });
        if (response.data) {
          setTrainer(response.data); // set the trainer state with returned data
        } else {
          console.warn("No trainer data found.");
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };
  
    getTrainer();
  }, [trainerid]);
  

  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const response = await axios.get(`https://smartfitbackend.onrender.com/ratings/${trainerid}`);
        setAvgRating(response.data.avgRating || 0); // Set the average rating state
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };
    
    if (trainerid) fetchAvgRating(); // Fetch the rating when trainerid changes
  }, [trainerid]);

  const handleReviewSubmit = async (value) => {
    try {
      console.log(trainerid)
      const response = await axios.post('https://smartfitbackend.onrender.com/submitRating', {
        trainerId: trainerid,
        rating: value, // Pass the rating value directly
      });
      setAvgRating(response.data.newAverageRating); // Update the displayed average rating
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Round avgRating to nearest integer for better presentation
  const roundedAvgRating = Math.round(avgRating);

  return (
    <div className="t-profile container">
      <div className="account-container">
        <div></div>
        <User />
      </div>
      <div className="trainer">
        <div className="trainer-head mb2">
          <img
            src={trainer[0].image ? trainer[0].image : assets.profile}
            alt="Trainer"
            className="t-image mr2"
          />
          <h3 className="trainer-name">{trainer[0].name || "Unknown..."}</h3>
          <img src={assets.trainer} alt="trainer" className="icon mr2" />
          <p className="mr1">{roundedAvgRating}</p> {/* Display rounded dynamic rating */}
          <img className="icon mr2" src={assets.star} alt="rating" />
        </div>

        <div className="trainer-social mb2">
          {trainer[0].instagram && (
            <Link to={`https://instagram.com/${trainer[0].instagram}`} className="mr1">
              <img src={assets.instagram} alt="instagram" className="second-icon" />
            </Link>
          )}
          {trainer[0].telegram && (
            <Link to={`https://telegram.com/${trainer[0].telegram}`}>
              <img src={assets.telegram} alt="telegram" className="second-icon" />
            </Link>
          )}
        </div>
        <div className="mb1">
          <p className="mb1"><b>Rate this Trainer</b></p>
          <RatingSize handleReviewSubmit={handleReviewSubmit} trainerid={trainerid} />
        </div>

        <div className="mb2">
          <h4 className="mb1">Brief about the trainer:</h4>
          <p className="trainer-bio">{trainer[0].bio || "Trainer bio not provided yet."}</p>
        </div>

        <div className="trainer-details mb1">
          <div>
            <img src={assets.muscle} alt="icon" className="icon" />
            <p> <b>Total students: </b>{trainer[0].students || 0}</p>
          </div>
          <div>
            <img src={assets.experience} alt="icon" className="icon" />
            <p> <b>Experience: </b>{Math.floor(trainer[0].experience || 0)} years</p>
          </div>
          <div>
            <img src={assets.age} alt="icon" className="icon" />
            <p> <b>Age: </b>{trainer[0].age || "Not written"}</p>
          </div>
          <div>
            <img src={assets.gender} alt="icon" className="icon" />
            <p> <b>Gender: </b>{trainer[0].gender || "Not written"}</p>
          </div>
          <div>
            <img src={assets.call} alt="icon" className="icon" />
            <p> <b>Phone: </b>{trainer[0].phone || "Not written"}</p>
          </div>
        </div>
        <div className="apply">
          <Link to="/trainer" className="back-link">Back</Link>
        </div>
      </div>
    </div>
  );
}

export default TProfileContent;
