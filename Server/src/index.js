import express from "express";
import 'dotenv/config';
import { connectDB } from "./Config/ConnectDB.js";
import cors from "cors";
import UserRoute from "./Route/UserRoute.js";
import RecipeRoute from "./Route/RecipeRoute.js";

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", UserRoute);
app.use("/api/recipe", RecipeRoute);

await connectDB();
app.listen(port, () => {
    console.log("Server is on port no", port);
});