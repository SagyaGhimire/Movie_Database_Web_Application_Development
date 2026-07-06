import express from "express";
import movies from "./data/movies.js";
const app = express();
app.use(express.json()); {/*middleware to parse incoming JSON requests*/} {/*qarray lai json format ma pathauna lai chaixa yo*/}
const PORT = 3001; {/*default port is this in node.js*/}


{/*creation of api in backend*/}
app.get("/movies", (req, res) => { 
    return res.json(movies);
})
    

{/*this part is for adding new movies */}
app.post("/movies", (req, res) => {
    const movie = req.body;
    movies.push(movie);
    return res.status(201).json({ message: "Movie added successfully", movie });
});

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
 })