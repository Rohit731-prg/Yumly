import express from "express";
import {
  getAllCategory,
  getAllCountryName,
  getAllRecipeByCategory,
  getMealDataByID,
  getRecipeByCountry,
  getRecipesByName,
} from "../Controller/RecipeController.js";

const route = express.Router();

route.get("/getAllCaategory", getAllCategory);
route.post("/getMealsByCategory", getAllRecipeByCategory);
route.get("/getMealsByID/:id", getMealDataByID);

route.get("/getCountryName", getAllCountryName);
route.post("/getRecipeByCountry", getRecipeByCountry);
route.post("/getRecipeByName", getRecipesByName);

export default route;
