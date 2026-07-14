import mongoose from "mongoose";

//movie schema is the property of the movie which is use to create the movie model in the database  
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true ,trim: true},
  genre: { type: String, required: true , trim: true},
  year: { type: Number, required: true , trim: true},
  rating: { type: Number, min: 0, max: 10, trim: true },
  director: { type: String, required: true , trim: true},
  synopsis: { type: String, required: true , trim: true},
  cast: [{ type: String , required: true , trim: true}],

});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;