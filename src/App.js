import React, {useState} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const fetchMoviesClickHandler = () => {
    fetch("https://swapi.py4e.com/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformMovies = data.results.map((m) => {
          return {
            id: m.episode_id,
            title: m.title,
            releaseDate: m.release_date,
            openingText: m.opening_crawl,
          };
        });
        setMovies(transformMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesClickHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
