import React from 'react';
import { FaTrash, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Watchlist({ watchlist, onRemoveMovie, onSelectMovie, ratings }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 overflow-y-auto flex-1">
      {watchlist.length === 0 ? (
        <p className="text-blue-200 text-center text-lg">Your watchlist is empty.</p>
      ) : (
        <AnimatePresence>
          {watchlist.map((movie) => (
            <motion.div
              key={movie.imdbID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between mb-4 p-3 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => onSelectMovie(movie.imdbID)}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/50x75'}
                  alt={movie.Title}
                  className="w-16 h-24 object-cover rounded-md shadow-md"
                />
                <div>
                  <h3 className="font-semibold text-lg text-blue-300">{movie.Title}</h3>
                  <p className="text-blue-200">{movie.Year}</p>
                  {ratings[movie.imdbID] && (
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-blue-200">Your rating: {ratings[movie.imdbID]}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemoveMovie(movie.imdbID)}
                className="text-red-400 hover:text-red-300 transition duration-300"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

