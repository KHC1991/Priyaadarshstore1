import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [totalRatings, setTotalRatings] = useState(128); // ડેમો માટે જૂના રેટિંગ્સ

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-priya-light my-4">
      <h3 className="text-xl font-bold mb-2 text-priya-dark">અમારી સ્ટોરને રેટિંગ આપો</h3>
      
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="transition-transform hover:scale-110 focus:outline-none"
            onClick={() => {
                setRating(star);
                setTotalRatings(prev => prev + 1);
                alert("તમારો આભાર! તમે " + star + " સ્ટાર રેટિંગ આપ્યું છે.");
            }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={40}
              fill={(hover || rating) >= star ? "#FFD700" : "none"}
              color={(hover || rating) >= star ? "#FFD700" : "#cbd5e1"}
              className="cursor-pointer"
            />
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-gray-600 font-medium">
        કુલ રેટિંગ્સ: <span className="text-priya-dark font-bold">{totalRatings}</span>
      </p>
      
      <div className="mt-2 flex items-center bg-blue-50 px-3 py-1 rounded-full">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="text-sm text-priya-dark font-semibold">4.8/5 એવરેજ સ્કોર</span>
      </div>
    </div>
  );
};

export default Rating;
