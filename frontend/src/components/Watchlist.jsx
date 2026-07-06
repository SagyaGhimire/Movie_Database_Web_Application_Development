function Watchlist({ watchlist, setWatchlist }) {

  // Function to remove a movie from watchlist
  function removeMovie(id) {

    const updatedWatchlist = watchlist.filter(
      (movie) => movie.id !== id
    );

    setWatchlist(updatedWatchlist);
  }

  return (

    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        My Watchlist
      </h2>

      {/* If watchlist is empty */}
      {watchlist.length === 0 ? (

        <p className="text-gray-600">
          No movies added to your watchlist yet.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {watchlist.map((movie) => (

            <div
              key={movie.id}
              className="bg-stone-100 p-4 rounded border"
            >

              <h3 className="text-xl font-bold">
                {movie.title}
              </h3>

              <p>
                Genre: {movie.genre}
              </p>

              <p>
                Year: {movie.year}
              </p>

              <p>
                Director: {movie.director}
              </p>

              <p>
                Rating: {movie.rating}
              </p>

              <button
                onClick={() => removeMovie(movie.id)}
                className="mt-4 bg-red-300 px-4 py-2 rounded hover:bg-red-400"
              >
                Remove from Watchlist
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Watchlist;