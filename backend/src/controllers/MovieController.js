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
} from "../models/movieModel.js";


// GET all movies
export const getAllMovies = async (req, res) => {

    const movies = await getAllMoviesFromModel();

    return res.json(movies);

};


// POST movie
export const addMovie = async (req, res) => {

    const movie = await addMovieToModel(req.body);

    return res.status(201).json({
        message: "Movie added successfully",
        movie,
    });

};


// GET single movie by ID
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


// DELETE movie by ID
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


// View watchlist
export const getWatchlist = async (req, res) => {

    const watchlist = await getWatchlistFromModel();

    return res.json(watchlist);

};


// Add movie to watchlist
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

    const watchlist = await getWatchlistFromModel();

    const alreadyExists = watchlist.find(
        item => item._id.toString() === req.params.id
    );

    if (alreadyExists) {
        return res.status(400).json({
            message: "Movie is already in watchlist",
        });
    }

    await addToWatchlistInModel(req.params.id);

    return res.status(201).json({
        message: "Movie added to watchlist",
        movie,
    });

};


// Remove movie from watchlist
export const removeFromWatchlist = async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid movie ID",
        });
    }

    const watchlist = await getWatchlistFromModel();

    const movie = watchlist.find(
        item => item._id.toString() === req.params.id
    );

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found in watchlist",
        });
    }

    await removeFromWatchlistInModel(req.params.id);

    return res.json({
        message: "Movie removed from watchlist",
    });

};


// Update movie
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