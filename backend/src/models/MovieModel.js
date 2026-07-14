import movies from "../../data/movies.js";
import Movie from "../../data/movie.js";

// This array stores movies added to watchlist
let watchlist = [];

export async function getAllMovies() {
  return movies.find();
}

export async function addMovie(movieData) {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
}

export async function getMovieById(movieId) {
    return await Movie.findById(movieId);   
}

export async function deleteMovie(movieId) {
    return await Movie.findByIdAndDelete(movieId);
}

export async function getWatchlist() {
  return watchlist;
}


export async function addToWatchlist(movieId) {
  const movie = await Movie.findById(movieId);     
  watchlist.push(movie);
}

export async function removeFromWatchlist(movieId) {
  watchlist = watchlist.filter((movie) => movie._id.toString() !== movieId);
}

export async function updateMovie(movieId, updatedData) {
    return await Movie.findByIdAndUpdate(movieId, updatedData, { new: true });
}





// Export both movies and watchlist
export { movies, watchlist };