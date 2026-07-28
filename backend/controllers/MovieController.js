import mongoose from "mongoose";

import {
    getAllMovies as getAllMoviesFromModel,
    addMovie as addMovieToModel,
    getMovieById as getMovieByIdFromModel,
    deleteMovie as deleteMovieFromModel,
    getWatchlist as getWatchlistFromModel,
    addToWatchlist as addToWatchlistInModel,
    removeFromWatchlist as removeFromWatchlistInModel,
    updateMovie as updateMovieInModel,
    addReview as addReviewToModel,
} from "../models/movieModel.js";

export const getAllMovies = async (req, res) => {
    const movies = await getAllMoviesFromModel({
        genre: req.query.genre,
        search: req.query.search,
    });

    return res.json(movies);
};

export const addMovie = async (req, res) => {
    const movie = await addMovieToModel(req.body);

    return res.status(201).json({
        message: "Movie added successfully",
        movie,
    });
};

export const getMovieById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid movie ID",
        });
    }

    const movie = await getMovieByIdFromModel(req.params.id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    return res.json(movie);
};

export const deleteMovie = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid movie ID",
        });
    }

    const movie = await deleteMovieFromModel(req.params.id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    return res.json({
        message: "Movie deleted successfully",
    });
};

export const getWatchlist = async (req, res) => {
    const watchlist = await getWatchlistFromModel(req.user.id);
    return res.json(watchlist);
};

export const addToWatchlist = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid movie ID",
        });
    }

    const movie = await getMovieByIdFromModel(req.params.id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    const watchlist = await getWatchlistFromModel(req.user.id);
    const alreadyExists = watchlist.some((item) => item._id.toString() === req.params.id);

    if (alreadyExists) {
        return res.status(400).json({
            message: "Movie is already in watchlist",
        });
    }

    await addToWatchlistInModel(req.user.id, req.params.id);

    return res.status(201).json({
        message: "Movie added to watchlist",
        movie,
    });
};

export const removeFromWatchlist = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid movie ID",
        });
    }

    const watchlist = await getWatchlistFromModel(req.user.id);
    const movie = watchlist.find((item) => item._id.toString() === req.params.id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found in watchlist",
        });
    }

    await removeFromWatchlistInModel(req.user.id, req.params.id);

    return res.json({
        message: "Movie removed from watchlist",
    });
};

export const updateMovie = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid movie ID",
        });
    }

    const updatedMovie = await updateMovieInModel(
        req.params.id,
        req.body
    );

    if (!updatedMovie) {
        return res.status(404).json({
            message: "Movie not found",
        });
    }

    return res.json({
        message: "Movie updated successfully",
        movie: updatedMovie,
    });
};

export const addReview = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movie = await addReviewToModel(req.params.id, req.body, req.user);

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(201).json({
        message: "Review added successfully",
        movie,
    });
};
