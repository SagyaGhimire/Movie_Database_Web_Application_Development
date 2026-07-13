import { movies, watchlist } from "../models/movieModel.js";

// GET all movies
export const getAllMovies = (req, res) => {
    return res.json(movies);
};

// POST movie
export const addMovie = (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        director: req.body.director,
        rating: req.body.rating,
        synopsis: req.body.synopsis,
        poster: req.body.poster || "",
        cast: req.body.cast || []
    };
    movies.push(movie);

    return res.status(201).json({
        message: "Movie added successfully",
        movie,
    });
};

// GET single movie by ID
export const getMovieById = (req, res) => {
    const movie = movies.find(
        (m) => m.id === parseInt(req.params.id)
    );

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    return res.json(movie);
};

// DELETE movie by ID
export const deleteMovie = (req, res) => {
    const movieIndex = movies.findIndex(
        (m) => m.id === parseInt(req.params.id)
    );

    if (movieIndex === -1) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    movies.splice(movieIndex, 1);

    return res.json({
        message: "Movie deleted successfully",
    });
};

// View watchlist
export const getWatchlist = (req, res) => {
    return res.json(watchlist);
};

// Add movie to watchlist
export const addToWatchlist = (req, res) => {
    const id = parseInt(req.params.id);

    const movie = movies.find((m) => m.id === id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    const alreadyExists = watchlist.find((m) => m.id === id);

    if (alreadyExists) {
        return res.status(400).json({
            message: "Movie is already in watchlist",
        });
    }


    watchlist.push(movie);

    return res.status(201).json({
        message: "Movie added to watchlist",
        movie,
    });
};

// Remove movie from watchlist
export const removeFromWatchlist = (req, res) => {
    const id = parseInt(req.params.id);

    const movieIndex = watchlist.findIndex(
        (m) => m.id === id
    );

    if (movieIndex === -1) {
        return res.status(404).json({
            message: "Movie not found in watchlist",
        });
    }

    watchlist.splice(movieIndex, 1);

    return res.json({
        message: "Movie removed from watchlist",
    });
};

// Update movie
export const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);

    const movieIndex = movies.findIndex(
        (m) => m.id === id
    );

    if (movieIndex === -1) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...req.body,
    };

    movies[movieIndex] = updatedMovie;

    return res.json({
        message: "Movie updated successfully",
        movie: updatedMovie,
    });
};