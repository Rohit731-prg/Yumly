import express from "express";
import 'dotenv/config';
import { connectDB } from "./Config/ConnectDB.js";
import cors from "cors";

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
    return res.status(200).json({ message: "Server is on" });
});

await connectDB();
app.listen(port, () => {
    console.log("Server is on port no", port);
});