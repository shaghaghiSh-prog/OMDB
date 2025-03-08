import React, { useState } from 'react';

export default function StarRating({ totalStars, initialRating, onRate }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleClick = (rating) => {
    setSelectedRating(rating);
    onRate(rating);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-3xl cursor-pointer ${
              starValue <= (hoveredRating || selectedRating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleClick(starValue)}
          >
            ★
          </span>
        );
      })}
      {hoveredRating > 0 && (
        <span className="ml-2 text-gray-600">{hoveredRating}</span>
      )}
    </div>
  );
}

