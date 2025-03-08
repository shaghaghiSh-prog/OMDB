import React, { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { debounce } from 'lodash';

export default function SearchBar({ onSearch, resultCount }) {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((q) => onSearch(q), 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="relative max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a movie..."
        className="w-full p-4 pl-12 border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 text-lg bg-gray-800 text-blue-100 placeholder-blue-300"
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl" />
      {query && (
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-blue-300 bg-blue-900 px-2 py-1 rounded-full">
          {resultCount} results
        </span>
      )}
    </div>
  );
}

