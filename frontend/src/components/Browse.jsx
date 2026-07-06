import MovieGrid from "./MovieGrid";

function Browse({
  movies,
  search,
  setSearch,

  selectedMovie,
  setSelectedMovie,

  watchlist,
  setWatchlist,

  totalMovies,
  averageRating,
}) {

  // Filter movies according to search text
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Function to add or remove a movie from watchlist
function toggleWatchlist() {

  const exists = watchlist.some(
    (movie) => movie.id === selectedMovie.id
  );

  if (exists) {

    setWatchlist(
      watchlist.filter(
        (movie) => movie.id !== selectedMovie.id
      )
    );

  } else {

    setWatchlist([
      ...watchlist,
      selectedMovie,
    ]);

  }
}
  return (
    <div className="p-6">

      {/* Dashboard */}
      <div className="bg-[#AACDDC] rounded p-4 mb-6 flex gap-10">

        <div>
          <h3 className="font-bold text-lg">
            Total Movies
          </h3>

          <p className="text-2xl">
            {totalMovies}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg">
            Average Rating
          </h3>

          <p className="text-2xl">
            {averageRating}
          </p>
        </div>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded border border-[#AACDDC] mb-6"
      />

      {/* Movie Detail */}
      {selectedMovie && (

        <div className="bg-[#D2C4B4] rounded p-6 mb-6">

          <h2 className="text-3xl font-bold">
            {selectedMovie.title}
          </h2>

          <p className="mt-2">
            <strong>Genre:</strong> {selectedMovie.genre}
          </p>

          <p>
            <strong>Year:</strong> {selectedMovie.year}
          </p>

          <p>
            <strong>Director:</strong> {selectedMovie.director}
          </p>

          <p>
            <strong>Rating:</strong> {selectedMovie.rating}
          </p>

          <p className="mt-3">
            <strong>Synopsis:</strong>
          </p>

          <p>
            {selectedMovie.synopsis}
          </p>

          <p className="mt-3">
            <strong>Cast:</strong>
          </p>

          <ul className="list-disc ml-6">
            {selectedMovie.cast.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>

          <button
          onClick={toggleWatchlist}
          className="mt-5 bg-[#AACDDC] px-4 py-2 rounded hover:bg-[#81A6C6]">
            {watchlist.some((movie) => movie.id === selectedMovie.id)
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
            </button>
        </div>

      )}

      {/* Movie Grid */}
      <MovieGrid

        movies={filteredMovies}

        setSelectedMovie={setSelectedMovie}

      />

    </div>
  );
}

export default Browse;