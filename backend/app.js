import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import movieRoutes from "./src/routes/movieRoutes.js";
import dbConnection from "./src/config/db.js";

const app = express();
dotenv.config();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for all routes   
app.use(cors());

const PORT = 3001;

// Use all movie routes
app.use("/", movieRoutes);

await dbConnection(); // Connect to MongoDB

// Start the server
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});