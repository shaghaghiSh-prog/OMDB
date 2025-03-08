import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function MovieList({ movies, onSelectMovie, loading, ratings }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
        <p className="text-blue-300 text-xl">No movies found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 overflow-y-auto flex-1">
      <AnimatePresence>
        {movies.map((movie) => (
          <motion.div
            key={movie.imdbID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 hover:bg-opacity-50 p-3 rounded-lg transition duration-300 mb-3"
            onClick={() => onSelectMovie(movie.imdbID)}
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150'}
              alt={movie.Title}
              className="w-16 h-24 object-cover rounded-md shadow-md"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-blue-300">{movie.Title}</h3>
              <p className="text-blue-200">{movie.Year}</p>
              {ratings[movie.imdbID] && (
                <div className="flex items-center mt-1">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm text-blue-200">Your rating: {ratings[movie.imdbID]}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

