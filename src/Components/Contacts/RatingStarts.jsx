// StarRating.js
import React, { useState } from "react";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          role="button"
          tabIndex={0}
          style={{
            cursor: "pointer",
            fontSize:'30px',
            color: index + 1 <= rating ? "#ffd700" : "#c2c2c2",
          }}
        >
          &#9733; {/* Unicode character for a solid star */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
