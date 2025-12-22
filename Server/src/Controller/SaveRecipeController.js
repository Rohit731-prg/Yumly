import axios from "axios";
import SaveRecipeModel from "../Model/SaveRecipeModel.js";

export const updateList = async (req, res) => {
  const { id } = req.params;
  try {
    const userID = req.user?._id;
    const is_exist = await SaveRecipeModel.findOne({ user: userID, "saveList.idMeal": id });
    if (is_exist) return res.json({ message: "Recipe is already exist in your Phone "});
    const recipe = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!recipe) return res.status(400).json({ message: "No data found" });
    const data = {
      idMeal: recipe?.data?.meals[0]?.idMeal,
      strMeal: recipe?.data?.meals[0]?.strMeal,
      strMealThumb: recipe?.data?.meals[0]?.strMealThumb,
    };
    const update = await SaveRecipeModel.updateOne(
      { user: userID },
      { $push: { saveList: data } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: reeor?.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const userID = req.user?._id;
    const getAllRecipe = await SaveRecipeModel.findOne({ user: userID });
    if (!getAllRecipe || !getAllRecipe?.saveList)
      return res.status(400).json({ message: "No data found" });
    const update = await SaveRecipeModel.updateOne(
      { user: userID },
      { $pull: { saveList: { id: id } } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ message: reeor?.message });
  }
};

export const getAllSaveRecipe = async (req, res) => {
  try {
    const id = req.user?._id;
    const response = await SaveRecipeModel.findOne({ user: id });
    if (!response || !response?.saveList)
      return res.status(400).json({ message: "No data found" });

    res.status(200).json({ saveList: response });
  } catch (error) {
    res.status(500).json({ message: reeor?.message });
  }
};
