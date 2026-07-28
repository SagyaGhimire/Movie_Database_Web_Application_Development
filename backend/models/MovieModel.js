import Movie from "../data/movie.js";
import User from "../data/user.js";

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

export async function getWatchlist(userId) {
    const user = await User.findById(userId).populate("watchlist");
    return user?.watchlist || [];
}

export async function addToWatchlist(userId, movieId) {
    const user = await User.findById(userId);
    if (!user) return null;

    if (!user.watchlist.some((id) => id.toString() === movieId)) {
        user.watchlist.push(movieId);
        await user.save();
    }

    return await User.findById(userId).populate("watchlist");
}

export async function removeFromWatchlist(userId, movieId) {
    const user = await User.findById(userId);
    if (!user) return null;

    user.watchlist = user.watchlist.filter((id) => id.toString() !== movieId);
    await user.save();
    return await User.findById(userId).populate("watchlist");
}

export async function addReview(movieId, reviewData, user) {
    const movie = await Movie.findById(movieId);
    if (!movie) return null;

    const review = {
        userId: user.id,
        userName: user.name,
        rating: Number(reviewData.rating),
        comment: reviewData.comment || "",
        createdAt: new Date(),
    };

    movie.reviews.push(review);
    const total = movie.reviews.reduce((sum, item) => sum + Number(item.rating), 0);
    movie.rating = Number((total / movie.reviews.length).toFixed(1));
    movie.avgRating = movie.rating;
    await movie.save();

    return movie;
}
