import React, {useCallback, useEffect, useState} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesClickHandler = useCallback(async () => {
    console.log("f");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://swapi.py4e.com/api/films");

      if (!response.ok) {
        throw new Error(`something went wrong!  ${response.status}`);
      }
      const data = await response.json();

      const transformMovies = data.results.map((m) => {
        return {
          id: m.episode_id,
          title: m.title,
          releaseDate: m.release_date,
          openingText: m.opening_crawl,
        };
      });
      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesClickHandler();
  }, [fetchMoviesClickHandler]);

  let content = <p>Found no movies</p>;
  if (isLoading) {
    content = <p>is Loading ...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesClickHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
