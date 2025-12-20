import mongoose, { Schema } from "mongoose";

const SaveRecipeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    saveList: { type: Array, default: [{}] },
});

export default mongoose.model("saveRecipe", SaveRecipeSchema);