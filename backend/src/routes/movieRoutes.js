import express from "express";

import {
    getAllMovies,
    addMovie,
    getMovieById,
    deleteMovie,
    updateMovie,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from "../controllers/movieController.js";

const router = express.Router();

// Movie Routes

// GET all movies
router.get("/movies", getAllMovies);

// POST movie
router.post("/movies", addMovie);

// GET single movie by ID
router.get("/movies/:id", getMovieById);

// UPDATE movie
router.put("/movies/:id", updateMovie);

// DELETE movie
router.delete("/movies/:id", deleteMovie);

// Watchlist Routes

// View watchlist
router.get("/watchlist", getWatchlist);

// Add movie to watchlist
router.post("/watchlist/:id", addToWatchlist);

// Remove movie from watchlist
router.delete("/watchlist/:id", removeFromWatchlist);

export default router;