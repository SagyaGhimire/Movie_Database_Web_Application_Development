import Movie from "../../data/movie.js";

// This array stores movies added to watchlist
let watchlist = [];

// GET all movies
export async function getAllMovies() {
    return await Movie.find();
}

// POST movie
export async function addMovie(movieData) {
    const movie = new Movie(movieData);
    await movie.save(); 
    return movie;
}

// GET single movie by ID
export async function getMovieById(movieId) {
    return await Movie.findById(movieId);
}

// DELETE movie
export async function deleteMovie(movieId) {
    return await Movie.findByIdAndDelete(movieId);
}

// UPDATE movie
export async function updateMovie(movieId, updatedData) {
    return await Movie.findByIdAndUpdate(
        movieId,
        updatedData,
        { new: true }
    );
}

// View watchlist
export async function getWatchlist() {
    return watchlist;
}

// Add movie to watchlist
export async function addToWatchlist(movieId) {

    const movie = await Movie.findById(movieId);

    if (movie) {
        watchlist.push(movie);
    }

    return movie;
}

// Remove movie from watchlist
export async function removeFromWatchlist(movieId) {

    watchlist = watchlist.filter(
        movie => movie._id.toString() !== movieId
    );
}

export { watchlist };