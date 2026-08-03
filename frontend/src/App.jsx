import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";
import AddMovie from "./components/AddMovie";
import Browse from "./components/Browse";
import Login from "./components/Login";
import Register from "./components/Register";
import { getAllMovies, addMovie, updateMovie, deleteMovie, addToWatchlist, removeFromWatchlist, getWatchlist, registerUser, loginUser, addReview, setAuthToken } from "./api/movieApi";

function App() {
  const [page, setPage] = useState("login");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [user, setUser] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    setTotalMovies(movies.length);

    if (movies.length > 0) {
      const total = movies.reduce((sum, movie) => sum + Number(movie.rating ?? movie.avgRating ?? 0), 0);
      setAverageRating((total / movies.length).toFixed(1));
    } else {
      setAverageRating(0);
    }
  }, [movies]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const moviesData = await getAllMovies({ search, genre });
        setMovies(Array.isArray(moviesData) ? moviesData : []);
      } catch (error) {
        setErrors((prev) => [...prev, error.message]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [search, genre]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
      setPage("browse");
    }
  }, []);

  useEffect(() => {
    async function fetchWatchlist() {
      if (!user) return;

      try {
        const watchlistData = await getWatchlist();
        setWatchlist(Array.isArray(watchlistData) ? watchlistData : []);
      } catch (error) {
        setErrors((prev) => [...prev, error.message]);
      }
    }

    fetchWatchlist();
  }, [user]);

  const handleCreateMovie = async (movieData) => {
    try {
      const response = await addMovie(movieData);
      setMovies((prev) => [...prev, response.movie]);
      setPage("browse");
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const handleUpdateMovie = async (movieId, movieData) => {
    try {
      const response = await updateMovie(movieId, movieData);
      setMovies((prev) => prev.map((movie) => (movie._id === movieId ? response.movie : movie)));
      setEditingMovie(null);
      setPage("browse");
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteMovie(movieId);
      setMovies((prev) => prev.filter((movie) => movie._id !== movieId));
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const handleAddToWatchlist = async (movieId) => {
    if (!user) {
      setErrors((prev) => [...prev, "Please log in to manage your watchlist"]);
      return;
    }

    try {
      const response = await addToWatchlist(movieId);
      setWatchlist((prev) => [...prev, response.movie]);
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    if (!user) {
      setErrors((prev) => [...prev, "Please log in to manage your watchlist"]);
      return;
    }

    try {
      await removeFromWatchlist(movieId);
      setWatchlist((prev) => prev.filter((movie) => movie._id !== movieId));
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = page === "register"
        ? await registerUser({ name: authName, email: authEmail, password: authPassword })
        : await loginUser({ email: authEmail, password: authPassword });

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setAuthToken(result.token);
      setUser(result.user);
      setAuthEmail("");
      setAuthPassword("");
      setAuthName("");
      setPage("browse");
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setWatchlist([]);
    setPage("login");
    setSelectedMovie(null);
    setErrors([]);
  };

  const handleReviewSubmit = async (movieId) => {
    if (!user) {
      setErrors((prev) => [...prev, "Please log in to post a review"]);
      return;
    }

    try {
      const response = await addReview(movieId, { rating: reviewRating, comment: reviewText });
      setMovies((prev) => prev.map((movie) => (movie._id === movieId ? response.movie : movie)));
      setReviewText("");
      setReviewRating(5);
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  return (
    <div className="min-h-screen bg-[#DBDFEA]">
      {user && <NavBar setPage={setPage} user={user} onLogout={handleLogout} />}

      {errors.length > 0 && (
        <div className="mx-6 mt-4 rounded bg-red-100 p-3 text-red-700">
          {errors[errors.length - 1]}
        </div>
      )}

      {page === "login" && (
        <Login
          onLogin={async (credentials) => {
            try {
              const result = await loginUser(credentials);
              localStorage.setItem("token", result.token);
              localStorage.setItem("user", JSON.stringify(result.user));
              setAuthToken(result.token);
              setUser(result.user);
              setPage("browse");
            } catch (error) {
              setErrors((prev) => [...prev, error.message]);
            }
          }}
          onSwitchToRegister={() => setPage("register")}
        />
      )}

      {page === "register" && (
        <Register
          onRegister={async (details) => {
            try {
              const result = await registerUser(details);
              localStorage.setItem("token", result.token);
              localStorage.setItem("user", JSON.stringify(result.user));
              setAuthToken(result.token);
              setUser(result.user);
              setPage("browse");
            } catch (error) {
              setErrors((prev) => [...prev, error.message]);
            }
          }}
          onSwitchToLogin={() => setPage("login")}
        />
      )}

      {page === "browse" && (
        <Browse
          movies={movies}
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          watchlist={watchlist}
          toggleWatchlist={async (movie) => {
            const movieId = movie._id ?? movie.id;
            const exists = watchlist.some((item) => (item._id ?? item.id) === movieId);

            if (exists) {
              await handleRemoveFromWatchlist(movieId);
            } else {
              await handleAddToWatchlist(movieId);
            }
          }}
          totalMovies={totalMovies}
          averageRating={averageRating}
          setEditingMovie={setEditingMovie}
          setPage={setPage}
          user={user}
          reviewText={reviewText}
          setReviewText={setReviewText}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          onReviewSubmit={handleReviewSubmit}
        />
      )}

      {page === "watchlist" && (
        <Watchlist
          watchlist={watchlist}
          setWatchlist={handleRemoveFromWatchlist}
        />
      )}

      {page === "add" && (
        <AddMovie
          movies={movies}
          setMovies={setMovies}
          setPage={setPage}
          editingMovie={editingMovie}
          setEditingMovie={setEditingMovie}
          onCreateMovie={handleCreateMovie}
          onUpdateMovie={handleUpdateMovie}
          onDeleteMovie={handleDeleteMovie}
        />
      )}

      {isLoading && <p className="p-6 text-gray-700">Loading movies...</p>}
    </div>
  );
}

export default App;