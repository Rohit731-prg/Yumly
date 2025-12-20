import express from "express";
import 'dotenv/config';
import { connectDB } from "./Config/ConnectDB.js";
import cors from "cors";
import UserRoute from "./Route/UserRoute.js";
import RecipeRoute from "./Route/RecipeRoute.js";
import SaveFileRoute from "./Route/SaveRoute.js";
import genAIRoute from "./Route/genAI.js";

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

app.use("/api/user", UserRoute);
app.use("/api/recipe", RecipeRoute);
app.use("/api/save", SaveFileRoute);
app.use("/api/genAI", genAIRoute);

await connectDB();
app.listen(port, () => {
    console.log("Server is on port no", port);
});