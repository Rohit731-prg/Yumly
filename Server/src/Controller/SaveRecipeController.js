import axios from "axios";
import SaveRecipeModel from "../Model/SaveRecipeModel.js";

export const updateList = async (req, res) => {
    const { id } = req.body;
    try {
        const userID = req.user
        const recipe = await axios.get(``);
        if (!recipe) return res.status(400).json({ message: "No data found" });
        const update = await SaveRecipeModel.updateOne(
            {user: userID},
            { $push: { saveList: id } },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: "Update successful" });
    } catch (error) {
        res.status(500).json({ message: reeor?.message });
    }
}