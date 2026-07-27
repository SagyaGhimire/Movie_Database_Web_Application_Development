import Movie from "../../data/movie.js";

let watchlist = [];

export async function getAllMovies(filters = {}) {
    const query = {};

    if (filters.genre) {
        query.genre = { $regex: `^${filters.genre}$`, $options: "i" };
    }

    if (filters.search) {
        query.title = { $regex: filters.search, $options: "i" };
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    return movies.map((movie) => ({
        ...movie.toObject(),
        rating: Number(movie.rating ?? movie.avgRating ?? 0),
        avgRating: Number(movie.avgRating ?? movie.rating ?? 0),
    }));
}

export async function addMovie(movieData) {
    const payload = {
        ...movieData,
        rating: movieData.rating ?? movieData.avgRating ?? 0,
        avgRating: movieData.avgRating ?? movieData.rating ?? 0,
        reviews: movieData.reviews ?? [],
    };

    const movie = new Movie(payload);
    await movie.save();
    return movie;
}

export async function getMovieById(movieId) {
    const movie = await Movie.findById(movieId);
    if (!movie) return null;

    return {
        ...movie.toObject(),
        rating: Number(movie.rating ?? movie.avgRating ?? 0),
        avgRating: Number(movie.avgRating ?? movie.rating ?? 0),
    };
}

export async function deleteMovie(movieId) {
    return await Movie.findByIdAndDelete(movieId);
}

export async function updateMovie(movieId, updatedData) {
    const payload = {
        ...updatedData,
        rating: updatedData.rating ?? updatedData.avgRating ?? 0,
        avgRating: updatedData.avgRating ?? updatedData.rating ?? 0,
        reviews: updatedData.reviews ?? [],
    };

    return await Movie.findByIdAndUpdate(
        movieId,
        payload,
        { new: true }
    );
}

export async function getWatchlist() {
    return watchlist;
}

export async function addToWatchlist(movieId) {
    const movie = await Movie.findById(movieId);

    if (movie) {
        watchlist.push(movie);
    }

    return movie;
}

export async function removeFromWatchlist(movieId) {
    watchlist = watchlist.filter(
        movie => movie._id.toString() !== movieId
    );
}

export { watchlist };