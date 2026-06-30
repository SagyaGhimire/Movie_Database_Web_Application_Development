import MovieGrid from "./MovieGrid";

function Browse() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Browse Movies</h2>

      <MovieGrid />
    </div>
  );
}

export default Browse;