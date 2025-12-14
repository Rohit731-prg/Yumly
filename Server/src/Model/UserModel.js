import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require },
    image: { type: String, require: true },
    auth: { type: Boolean, default: false },
    otp: { type: String, default: "" }
}, {
    timestamps: true
});

export default mongoose.model("User", UserSchema);