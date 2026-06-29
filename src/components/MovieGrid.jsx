import MovieCard from "./MovieCard";
import movies from "./movies";

{/*This is the MovieGrid component(function) which is used to display the list of movies in a grid format*/}
function MovieGrid() {
  return (
    <div>
      {/*This section is for displaying the list of movies in a grid format*/}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          genre={movie.genre}
          year={movie.year}
          rating={movie.rating}
        />
        
      ))}
    </div>
  );
}

export default MovieGrid;