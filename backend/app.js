import express from "express";
import movieRoutes from "./src/routes/movieRoutes.js";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

const PORT = 3001;

// Use all movie routes
app.use("/", movieRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});