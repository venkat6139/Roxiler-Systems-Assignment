import React, { useState } from "react";
import axios from "axios";
import "./RatingForm.css";

function RatingForm({ storeId }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("Please select a valid rating between 1 and 5.");
      return;
    }

    const response = await axios.post(`/api/stores/${storeId}/rate`, {
      rating,
      feedback,
    });

    if (response.status === 200) {
      alert("Rating submitted successfully!");
      setRating(0);
      setFeedback("");
    } else {
      alert("There was an error submitting your rating.");
    }
  };

  return (
    <div className="rating-form-container">
      <h2>Rate This Store</h2>
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="rating-selection">
          <label htmlFor="rating">Rating (1 to 5):</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-select"
          >
            <option value="0">Select Rating</option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div className="feedback-section">
          <label htmlFor="feedback">Leave a Feedback (Optional):</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="feedback-input"
            placeholder="Share your experience..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default RatingForm;
