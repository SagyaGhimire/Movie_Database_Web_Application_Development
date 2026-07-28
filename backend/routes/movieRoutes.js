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

import {
    movieRules,
    validateMovie,
} from "../validators/movieValidator.js";

const router = express.Router();

// Movie Routes
router.get("/movies", getAllMovies);
router.post("/movies", movieRules, validateMovie, addMovie);
router.get("/movies/:id", getMovieById);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

// Watchlist Routes
router.get("/watchlist", getWatchlist);
router.post("/watchlist/:id", addToWatchlist);
router.delete("/watchlist/:id", removeFromWatchlist);

export default router;