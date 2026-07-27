import cookieParse from 'cookie-parser'
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import movieRoutes from "./src/routes/movieRoutes.js";
import dbConnection from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";


const app = express();
dotenv.config();

app.use(cookieParse());
app.use(express.json());
app.get('/health', (req, res)=> res.status(200).json({ok:true}))
app.use(cors(
    {
        origin:(origin, callback)=> {
            if(!origin || ['http://localhost:5173/']){
                return callback(null, true)
            }
            callback(new Error('CORS origin not allowed'))
        }, credentials: true
    },
));


const PORT = process.env.PORT || 3001;

app.use("/auth", authRoutes);
app.use("/api", movieRoutes);

await dbConnection();

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});