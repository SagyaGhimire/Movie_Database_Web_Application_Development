import mongoose from "mongoose";

// Movie schema is the property of the movie which is used to create the movie model in the database
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

    rating: {
        type: Number,
        min: 0,
        max: 10,
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