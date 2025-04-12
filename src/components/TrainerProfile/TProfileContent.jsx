import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import assets from "../assets";
import User from "../Reusable/user"; 
import axios from "axios";
import RatingSize from "../Reusable/RatingSize";

function TProfileContent() {
  const [trainer, setTrainer] = useState({});
  const [avgRating, setAvgRating] = useState(0);
  const { trainerid } = useParams(); // Access trainerid from URL params

  useEffect(() => {
    if (!trainerid) return;

    const getTrainer = async () => {
      try {
        const res = await axios.post("http://localhost:3001/trainer", { trainerid });
        setTrainer(res.data); // Assuming response is an object with trainer details
      } catch (error) {
        console.error('Error fetching trainer data:', error);
      }
    };

    getTrainer();
  }, [trainerid]);

  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ratings/${trainerid}`);
        setAvgRating(response.data.avgRating || 0); // Set the average rating state
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };
    
    if (trainerid) fetchAvgRating(); // Fetch the rating when trainerid changes
  }, [trainerid]);

  const handleReviewSubmit = async (value) => {
    try {
      const response = await axios.post('http://localhost:3001/submitRating', {
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
            src={trainer.image ? trainer.image : assets.profile}
            alt="Trainer"
            className="t-image mr2"
          />
          <h3 className="trainer-name">{trainer.name || "Unknown..."}</h3>
          <img src={assets.trainer} alt="trainer" className="icon mr2" />
          <p className="mr1">{roundedAvgRating}</p> {/* Display rounded dynamic rating */}
          <img className="icon mr2" src={assets.star} alt="rating" />
        </div>

        <div className="trainer-social mb2">
          {trainer.instagram && (
            <Link to={`https://instagram.com/${trainer.instagram}`} className="mr1">
              <img src={assets.instagram} alt="instagram" className="second-icon" />
            </Link>
          )}
          {trainer.telegram && (
            <Link to={`https://telegram.com/${trainer.telegram}`}>
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
          <p className="trainer-bio">{trainer.bio || "Trainer bio not provided yet."}</p>
        </div>

        <div className="trainer-details mb1">
          <div>
            <img src={assets.muscle} alt="icon" className="icon" />
            <p> <b>Total students: </b>{trainer.students || 0}</p>
          </div>
          <div>
            <img src={assets.experience} alt="icon" className="icon" />
            <p> <b>Experience: </b>{Math.floor(trainer.experience || 0)} years</p>
          </div>
          <div>
            <img src={assets.age} alt="icon" className="icon" />
            <p> <b>Age: </b>{trainer.age || "Not written"}</p>
          </div>
          <div>
            <img src={assets.gender} alt="icon" className="icon" />
            <p> <b>Gender: </b>{trainer.gender || "Not written"}</p>
          </div>
          <div>
            <img src={assets.call} alt="icon" className="icon" />
            <p> <b>Phone: </b>{trainer.phone || "Not written"}</p>
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
