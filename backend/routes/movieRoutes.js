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
    addReview,
} from "../controllers/MovieController.js";

import { getMovieRecommendation } from "../controllers/aiController.js";

import authenticate from "../middleware/auth.js";
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
router.get("/watchlist", authenticate, getWatchlist);
router.post("/watchlist/:id", authenticate, addToWatchlist);
router.delete("/watchlist/:id", authenticate, removeFromWatchlist);

// AI Recommendation Route
router.post("/ai/recommend", authenticate, getMovieRecommendation);

// Review Route
router.post("/movies/:id/reviews", authenticate, addReview);

export default router;