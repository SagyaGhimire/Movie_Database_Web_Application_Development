import express from "express";
import movies from "./data/movies.js";
const app = express();
app.use(express.json()); // middleware to parse incoming JSON requests, array lai json format ma pathauna lai chaixa yo
let watchlist = [];
const PORT = 3001; //default port is this in node.js

//creation of api in backend

//GET all movies
app.get("/movies", (req, res) => { 
    return res.json(movies);
})
    

//POST Movie
app.post("/movies", (req, res) => {
    const movie = req.body;
    movies.push(movie);
    return res.status(201).json({ message: "Movie added successfully", movie });
});

//GET Single Movie by ID
app.get("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    return res.json(movie);
});

//DELETE Movie by ID
app.delete("/movies/:id", (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" });
    movies.splice(movieIndex, 1);
    return res.json({ message: "Movie deleted successfully" });
});

//view watchlist
app.get("/watchlist", (req, res) => {
    return res.json(watchlist);
});

//add movie to watchlist
app.post("/watchlist/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(m => m.id === id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    watchlist.push(movie);
    return res.status(201).json({ message: "Movie added to watchlist", movie });
});


// remove movie from watchlist
app.delete("/watchlist/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = watchlist.findIndex(m => m.id === id);
    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found in watchlist" });
    watchlist.splice(movieIndex, 1);
    return res.json({ message: "Movie removed from watchlist" });
});

//update movie by id
app.put("/movies/:id", (req, res) => {
    console.log(req.body); 
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" });
    const updatedMovie = { ...movies[movieIndex], ...req.body };
    movies[movieIndex] = updatedMovie;
    return res.json({ message: "Movie updated successfully", movie: updatedMovie });
});

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
 })