import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";
import AddMovie from "./components/AddMovie";
import Browse from "./components/Browse";

import initialMovies from "./components/movies";

function App() {

  // Current page
  const [page, setPage] = useState("browse");

  // Movies state
  const [movies, setMovies] = useState(initialMovies);

  // Watchlist state
  const [watchlist, setWatchlist] = useState([]);

  // Search state
  const [search, setSearch] = useState("");

  // Selected movie for detail view
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Dashboard states
  const [totalMovies, setTotalMovies] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

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

        />

      )}

    </div>
  );
}

export default App;