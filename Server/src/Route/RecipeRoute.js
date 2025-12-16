import express from "express";
import { getAllCategory, getAllRecipeByCategory, getMealDataByID } from "../Controller/RecipeController.js";

const route = express.Router();

route.get("/getAllCaategory", getAllCategory);
route.post("/getMealsByCategory", getAllRecipeByCategory);
route.get("/getMealsByID/:id", getMealDataByID);

export default route;