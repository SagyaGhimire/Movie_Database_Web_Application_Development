import AIRecommendations from "./AIRecommendations";

function Watchlist({ watchlist = [], onRemove, onRecommend, recommendations = [], isLoading, error }) {

  // Function to remove a movie from watchlist (calls parent handler)
  async function removeMovie(id) {
    try {
      if (typeof onRemove === "function") {
        await onRemove(id);
      }
    } catch (err) {
      console.error("Failed to remove movie from watchlist:", err);
    }
  }

  return (

    <div className="p-6">
      <div className="mb-6 flex items-center justify-end">
        <button
          onClick={onRecommend}
          disabled={isLoading}
          className="rounded-2xl bg-[#D6B88C] px-5 py-3 text-slate-950 transition hover:bg-[#c49f70] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Recommending..." : "Recommend Me Something"}
        </button>
      </div>

      <AIRecommendations
        recommendations={recommendations}
        isLoading={isLoading}
        error={error}
      />

      <div className="mb-6 rounded-[32px] border border-[#D3C2A4] bg-[#F7EDD9] p-6 shadow-sm">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">My Watchlist</h2>
          <p className="mt-2 text-sm text-[#6F5A42]">Your selected movies are shown below. Remove items or ask AI for fresh suggestions.</p>
        </div>
      </div>

      {/* If watchlist is empty */}
      {watchlist.length === 0 ? (

        <p className="text-gray-600">
          No movies added to your watchlist yet.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {watchlist.map((movie) => (

            <div
              key={movie._id ?? movie.id}
              className="bg-[#F7E6D1] p-5 rounded-3xl border border-[#D3B98F] shadow-sm"
            >

              <h3 className="text-xl font-semibold text-slate-950">
                {movie.title}
              </h3>

              <p className="mt-2 text-sm text-[#6F5A42]">
                Genre: {movie.genre}
              </p>

              <p className="mt-1 text-sm text-[#6F5A42]">
                Year: {movie.year}
              </p>

              <p className="mt-1 text-sm text-[#6F5A42]">
                Director: {movie.director}
              </p>

              <p className="mt-1 text-sm text-[#6F5A42]">
                Rating: {Number(movie.rating ?? movie.avgRating ?? 0).toFixed(1)}
              </p>

              <button
                onClick={() => removeMovie(movie._id ?? movie.id)}
                className="mt-4 rounded-2xl bg-[#C39A5B] px-4 py-2 text-white transition hover:bg-[#a67f44]"
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