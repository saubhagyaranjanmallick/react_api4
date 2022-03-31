import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./Search.svg";

const API_URL = "http://www.omdbapi.com?apikey=49e29987";


const App = () => {
  //states
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("super");

  //methods
  const searchMovies = async (title) => {
    const response = await fetch(API_URL + "&s=" + title);
    const data = await response.json();
    //setSearchTerm(title);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
