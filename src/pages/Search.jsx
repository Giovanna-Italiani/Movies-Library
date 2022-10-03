import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './MoviesGrid.css';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKEY = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKEY}&query=${query}`;
    getSearchedMovies(searchWithQueryUrl);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Loading...</p>}
        {movies.length > 0 &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
};

export default Search;
