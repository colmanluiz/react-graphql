import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("connected to MongoDB.");
    } catch (error) {
        console.error("failed to connecting to MongoDB, error: ", error);
        process.exit(1);
    }
};