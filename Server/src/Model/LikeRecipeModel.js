import mongoose, { Schema } from "mongoose";

const LikeRecipeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, require: true },
    recipeID: { type: String, require: true },
    recipe: { type: Object, require: true }
}, {
    timestamps: true
});

export default mongoose.model("LikeRecipe", LikeRecipeSchema);