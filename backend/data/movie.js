import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    genre: {
        type: String,
        required: true,
        trim: true,
    },

    year: {
        type: Number,
        required: true,
    },

    director: {
        type: String,
        required: true,
        trim: true,
    },

    synopsis: {
        type: String,
        required: true,
        trim: true,
    },

    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },

    avgRating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },

    reviews: {
        type: [String],
        default: [],
    },

    poster: {
        type: String,
        default: "",
    },

    cast: [
        {
            type: String,
            trim: true,
        },
    ],
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;