import React, { useState } from "react";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MovieDetails({
  movie,
  onAddToWatchlist,
  isInWatchlist,
  onBack,
  onRateMovie,
  userRating,
}) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (rating) => {
    onRateMovie(movie.imdbID, rating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 overflow-y-auto flex-1"
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-300 hover:text-blue-200 transition duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back to results
      </button>
      {isInWatchlist && (
        <p className="text-sm self-center text-center p-4 justify-center content-center text-blue-200">
          This movie is in your watchlist.
        </p>
      )}
      <div className="flex flex-col md:flex-row">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
          className="w-full md:w-52 h-72 object-cover rounded-lg shadow-lg mr-6 mb-4 md:mb-0"
        />
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-2 text-blue-300">
            {movie.Title}
          </h2>
          <p className="text-blue-200 mb-4">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>
          <p className="mb-2">
            <strong className="text-blue-200">Director:</strong>{" "}
            <span className="text-gray-300">{movie.Director}</span>
          </p>
          <p className="mb-2">
            <strong className="text-blue-200">Cast:</strong>{" "}
            <span className="text-gray-300">{movie.Actors}</span>
          </p>
          <p className="mb-4">
            <strong className="text-blue-200">IMDb Rating:</strong>{" "}
            <span className="text-gray-300">{movie.imdbRating}/10</span>
          </p>
        </div>
      </div>
      <div className="mb-4 mt-3 text-center pt-5">
        <strong className="  text-blue-200">Your Rating:</strong>
        <div className="flex items-center mt-1  text-center justify-center content-center flex-wrap">
          {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                className={`cursor-pointer  ${
                  starValue <= (hoveredRating || userRating)
                    ? "text-yellow-400"
                    : "text-gray-600"
                } text-2xl mr-1 mb-1 transition-colors duration-200`}
                onMouseEnter={() => setHoveredRating(starValue)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRating(starValue)}
              />
            );
          })}
          {hoveredRating > 0 && (
            <span className="ml-2 text-blue-200">{hoveredRating}</span>
          )}
        </div>
        {userRating > 0 && (
          <p className="text-sm text-blue-200 mt-1">
            You have rated this movie {userRating} stars.
          </p>
        )}
      </div>
      {userRating > 0 && !isInWatchlist && (
        <button
          onClick={() => onAddToWatchlist(movie)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Add to Watchlist
        </button>
      )}
      
      <p className="mb-4 text-gray-300 font-serif">{movie.Plot}</p>
    </motion.div>
  );
}
