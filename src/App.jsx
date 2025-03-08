import { useState, useCallback, useEffect } from 'react';
import { FaList } from 'react-icons/fa';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/WatchList';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('search');

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    setWatchlist(storedWatchlist);
    setRatings(storedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  const handleSearch = useCallback(async (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?apikey=8de2af02&s=${query}`);
    const data = await response.json();
    if (data.Search) {
      setSearchResults(data.Search);
    } else {
      setSearchResults([]);
    }
    setLoading(false);
  }, []);

  const handleSelectMovie = async (imdbID) => {
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?apikey=8de2af02&i=${imdbID}`);
    const data = await response.json();
    setSelectedMovie(data);
    setView('watchlist');
    setLoading(false);
  };

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some(item => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const handleRemoveFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter(movie => movie.imdbID !== imdbID));
  };

  const handleRateMovie = (imdbID, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [imdbID]: rating
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-300 mb-4">Movie Explorer</h1>
        <SearchBar onSearch={handleSearch} resultCount={searchResults.length} />
      </div>
      <div className="flex flex-1 space-x-4 max-w-5xl mx-auto w-full">
        <div className="w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Search Results</h2>
          <MovieList
            movies={searchResults}
            onSelectMovie={handleSelectMovie}
            loading={loading}
            ratings={ratings}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-300">
              {view === 'watchlist' ? 'Watchlist' : 'Movie Details'}
            </h2>
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <FaList className="mr-2 text-white" />
              <span className="text-white font-medium">{watchlist.length}</span>
            </div>
          </div>
          {view === 'watchlist' && selectedMovie ? (
            <MovieDetails
              movie={selectedMovie}
              onAddToWatchlist={handleAddToWatchlist}
              isInWatchlist={watchlist.some(item => item.imdbID === selectedMovie.imdbID)}
              onBack={() => setSelectedMovie(null)}
              onRateMovie={handleRateMovie}
              userRating={ratings[selectedMovie.imdbID] || 0}
            />
          ) : (
            <Watchlist
              watchlist={watchlist}
              onRemoveMovie={handleRemoveFromWatchlist}
              onSelectMovie={handleSelectMovie}
              ratings={ratings}
            />
          )}
        </div>
      </div>
    </div>
  );
}

