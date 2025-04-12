import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StoreOwnerDashboard.css";

function StoreOwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchStoreRatings();
  }, []);

  const fetchStoreRatings = async () => {
    const response = await axios.get("/api/storeowner/ratings");
    setRatings(response.data.ratings);
    setAverageRating(response.data.averageRating);
  };

  return (
    <div className="store-dashboard-container">
      <h2>Your Store Dashboard</h2>

      <div className="summary-card">
        <h3>Average Rating:</h3>
        <p className="average-score">{averageRating.toFixed(1)} / 5</p>
      </div>

      <h3>Ratings from Users</h3>
      <div className="ratings-table">
        <div className="table-header">
          <div>User Name</div>
          <div>User Email</div>
          <div>Rating</div>
        </div>

        {ratings.map((rating) => (
          <div className="table-row" key={rating.id}>
            <div>{rating.userName}</div>
            <div>{rating.userEmail}</div>
            <div>{rating.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreOwnerDashboard;
