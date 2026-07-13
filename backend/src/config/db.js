import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

// Function to connect to MongoDB
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB cannot be connected:", error);   
            process.exit(); // Exit the process with failure
    }
};  
export default dbConnection;