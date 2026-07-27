import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import movieRoutes from "./src/routes/movieRoutes.js";
import dbConnection from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/auth", authRoutes);
app.use("/api", movieRoutes);

await dbConnection();

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});