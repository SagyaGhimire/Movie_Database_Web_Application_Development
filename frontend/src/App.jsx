import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";
import AddMovie from "./components/AddMovie";
import Browse from "./components/Browse";

import { getAllMovies } from "./api/movieApi";
import { addMovie, updateMovie, deleteMovie } from "./api/movieApi";
import { getMovieById } from "./api/movieApi";
import {addToWatchlist, removeFromWatchlist} from "./api/movieApi";
import { getWatchlist } from "./api/movieApi";


function App() {

  // Current page
  const [page, setPage] = useState("browse");

  // Movies state
  const [movies, setMovies] = useState([]);

  // Watchlist state
  const [watchlist, setWatchlist] = useState([]);

  // Search state
  const [search, setSearch] = useState("");

  // Selected movie for detail view
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Editing movie state
  const [editingMovie, setEditingMovie] = useState(null);

  // Dashboard states
  const [totalMovies, setTotalMovies] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const [errors, setErrors] = useState([]);
  // Dashboard calculation
  useEffect(() => {

    setTotalMovies(movies.length);

    if (movies.length > 0) {

      const total = movies.reduce(
        (sum, movie) => sum + Number(movie.rating),
        0
      );

      setAverageRating((total / movies.length).toFixed(1));

    } else {

      setAverageRating(0);

    }

  }, [movies]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      finally {
        try {
          const watchlistData = await getWatchlist();
          setWatchlist(watchlistData);
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
    }

  

  return (
    <div className="min-h-screen bg-[#DBDFEA]">

      <NavBar setPage={setPage} />

      {page === "browse" && (

        <Browse

          movies={movies}
          search={search}
          setSearch={setSearch}

          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}

          watchlist={watchlist}
          setWatchlist={setWatchlist}

          totalMovies={totalMovies}
          averageRating={averageRating}

          setEditingMovie={setEditingMovie}
          setPage={setPage}
        />

      )}

      {page === "watchlist" && (

        <Watchlist

          watchlist={watchlist}
          setWatchlist={setWatchlist}

        />

      )}

      {page === "add" && (

        <AddMovie

          movies={movies}
          setMovies={setMovies}
          setPage={setPage}
          editingMovie={editingMovie}
          setEditingMovie={setEditingMovie}
        />

      )}

    </div>
  );
}

export default App;