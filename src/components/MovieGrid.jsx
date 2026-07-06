import MovieCard from "./MovieCard";

/* This is the MovieGrid component(function) which is used to display the list of movies in a grid format */
function MovieGrid({ movies, setSelectedMovie }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* This section is for displaying the list of movies in a grid format */}
      {movies.map((movie) => (

        <MovieCard
          key={movie.id}
          movie={movie}
          setSelectedMovie={setSelectedMovie}
        />

      ))}

    </div>
  );
}

export default MovieGrid;