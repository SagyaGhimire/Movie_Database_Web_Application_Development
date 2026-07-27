import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

const dbConnection = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || process.env.mongoURI;

        if (!mongoURI) {
            console.warn("No MongoDB URI found. Set MONGO_URI in your environment.");
            return;
        }

        await mongoose.connect(mongoURI, {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB cannot be connected:", error);
        process.exit(1);
    }
};

export default dbConnection;