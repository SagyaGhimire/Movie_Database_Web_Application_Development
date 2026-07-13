import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import movieRoutes from "./src/routes/movieRoutes.js";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for all routes   
app.use(cors());

const PORT = 3000;

// Use all movie routes
app.use("/", movieRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});