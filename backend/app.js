import cookieParse from 'cookie-parser'
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { webcrypto } from "crypto";
// route imports delayed until after crypto shim and DB connect

if (!globalThis.crypto || !globalThis.crypto.subtle) {
    globalThis.crypto = webcrypto;
}

if (typeof global !== 'undefined' && (!global.crypto || !global.crypto.subtle)) {
    global.crypto = globalThis.crypto;
}

dotenv.config();

const { default: dbConnection } = await import("./config/db.js");

const requiredEnvs = ["MONGO_URI", "JWT_SECRET"];
const missingEnvs = requiredEnvs.filter((name) => !process.env[name]);

if (missingEnvs.length > 0) {
    console.error("Missing required environment variables:", missingEnvs.join(", "));
    process.exit(1);
}

// Import routes after DB connection is available to avoid loading Mongoose
const { default: movieRoutes } = await import("./routes/movieRoutes.js");
const { default: authRoutes } = await import("./routes/authRoutes.js");

const app = express();

app.use(cookieParse());
app.use(express.json());
app.get('/', (req, res) => res.status(200).json({ ok: true, message: 'Backend API is running' }));
app.get('/health', (req, res) => res.status(200).json({ ok: true }));
app.use(cors({ origin: true, credentials: true }));

const PORT = process.env.PORT || 3001;

app.use("/auth", authRoutes);
app.use("/api", movieRoutes);

await dbConnection();

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});