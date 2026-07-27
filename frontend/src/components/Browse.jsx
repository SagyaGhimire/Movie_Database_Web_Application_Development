import MovieGrid from "./MovieGrid";

function Browse({
  movies,
  search,
  setSearch,
  genre,
  setGenre,

  selectedMovie,
  setSelectedMovie,

  watchlist,
  toggleWatchlist,

  totalMovies,
  averageRating,
  setEditingMovie,
  setPage,
}) {

  const filteredMovies = movies.filter((movie) => {
    const title = movie.title?.toLowerCase() || "";
    const normalizedSearch = search.toLowerCase();
    const matchesSearch = !normalizedSearch || title.includes(normalizedSearch);
    const matchesGenre = !genre || movie.genre?.toLowerCase() === genre.toLowerCase();

    return matchesSearch && matchesGenre;
  });

  async function handleToggleWatchlist() {
    if (selectedMovie) {
      await toggleWatchlist(selectedMovie);
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
      <div className="flex flex-col gap-3 md:flex-row mb-6">
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 p-3 rounded border border-[#AACDDC]"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-3 rounded border border-[#AACDDC]"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      {/* Movie Detail */}
      {selectedMovie && (

        <div className="bg-[#D2C4B4] rounded p-6 mb-6 relative">

          {/* Close Button */}
<button
  onClick={() => setSelectedMovie(null)}
  className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-red-500"
>
  Close
</button>

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
            <strong>Rating:</strong> {Number(selectedMovie.rating ?? selectedMovie.avgRating ?? 0).toFixed(1)}
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
            {(selectedMovie.cast || []).map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>

          <button
          onClick={handleToggleWatchlist}
          className="mt-5 bg-[#AACDDC] px-4 py-2 rounded hover:bg-[#81A6C6]">
            {watchlist.some((movie) => (movie._id ?? movie.id) === (selectedMovie._id ?? selectedMovie.id))
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
            </button>
            
            <button onClick={() => {
              setEditingMovie(selectedMovie);
              setPage("add");
            }}className="ml-3 bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400">
               Edit Movie
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