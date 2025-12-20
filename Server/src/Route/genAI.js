import express from "express";
import { sendPrompt } from "../Controller/genAI.js";
import { verify } from "../Middleware/verify.js";

const route = express.Router();

// route.post("/getRecipe", verify, sendPrompt);
route.post("/getRecipe", sendPrompt);

export default route;