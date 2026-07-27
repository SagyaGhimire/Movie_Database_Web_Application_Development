import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";
import AddMovie from "./components/AddMovie";
import Browse from "./components/Browse";
import { getAllMovies, addMovie, updateMovie, deleteMovie, addToWatchlist, removeFromWatchlist, getWatchlist, registerUser, loginUser, addReview, setAuthToken } from "./api/movieApi";

function App() {
  const [page, setPage] = useState("browse");
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
  const [authPage, setAuthPage] = useState("login");
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
      const result = authPage === "register"
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
      <NavBar setPage={setPage} user={user} onLogout={handleLogout} setAuthPage={setAuthPage} />

      {errors.length > 0 && (
        <div className="mx-6 mt-4 rounded bg-red-100 p-3 text-red-700">
          {errors[errors.length - 1]}
        </div>
      )}

      {page === "auth" && (
        <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">{authPage === "register" ? "Register" : "Login"}</h2>
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
            {authPage === "register" && (
              <input
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                className="rounded border p-2"
                placeholder="Name"
              />
            )}
            <input
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              className="rounded border p-2"
              placeholder="Email"
            />
            <input
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="rounded border p-2"
              placeholder="Password"
            />
            <button className="rounded bg-[#AACDDC] p-2 font-semibold" type="submit">
              {authPage === "register" ? "Register" : "Login"}
            </button>
          </form>
          <p className="mt-3 text-sm text-gray-600">
            {authPage === "register" ? "Already have an account?" : "Need an account?"}
            <button
              className="ml-2 font-semibold text-[#81A6C6]"
              onClick={() => setAuthPage(authPage === "register" ? "login" : "register")}
            >
              {authPage === "register" ? "Login" : "Register"}
            </button>
          </p>
        </div>
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