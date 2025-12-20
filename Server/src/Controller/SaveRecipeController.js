import axios from "axios";
import SaveRecipeModel from "../Model/SaveRecipeModel.js";

export const updateList = async (req, res) => {
    const { id } = req.params;
    try {
        const userID = req.user?._id
        const recipe = await axios.get(`www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!recipe) return res.status(400).json({ message: "No data found" });
        const update = await SaveRecipeModel.updateOne(
            {user: userID},
            { $push: { saveList: recipe } },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: "Update successful" });
    } catch (error) {
        res.status(500).json({ message: reeor?.message });
    }
}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const userID = req.user?._id
        const getAllRecipe = await SaveRecipeModel.findOne({ user: userID });
        if (!getAllRecipe || !getAllRecipe?.saveList) return res.status(400).json({ message: "No data found" });
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
        if (!response || !response?.saveList) return res.status(400).json({ message: "No data found" });

        res.status(200).json({ saveList: response?.saveList });
    } catch (error) {
        res.status(500).json({ message: reeor?.message });
    }
}