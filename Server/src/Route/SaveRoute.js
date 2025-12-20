import express from "express";
import { deleteRecipe, getAllSaveRecipe, updateList } from "../Controller/SaveRecipeController.js";
import { verify } from "../Middleware/verify.js";

const route = express.Router();

route.put("/updateSaveRecipe/:id", verify, updateList);
route.put("/deleteRecipe/:id", verify, deleteRecipe);
route.get("/getAllRecipe", verify, getAllSaveRecipe);

export default route;