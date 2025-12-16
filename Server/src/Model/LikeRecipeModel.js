import mongoose, { Schema } from "mongoose";

const LikeRecipeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, require: true },
    recipeList: { type: Array, default: [] },
});

export default mongoose.model("LikeRecipe", LikeRecipeSchema);