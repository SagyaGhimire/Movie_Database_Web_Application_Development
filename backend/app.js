import express from "express";
import movies from "./data/movies.js";
const app = express();
app.use(express.json()); // middleware to parse incoming JSON requests, array lai json format ma pathauna lai chaixa yo
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

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
 })