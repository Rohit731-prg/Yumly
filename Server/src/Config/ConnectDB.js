import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("Database connected to ", conn.connection.host);
    } catch (error) {
        console.log("Error from connect db: ", error);
    }
}