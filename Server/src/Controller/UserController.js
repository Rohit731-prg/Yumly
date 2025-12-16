import LikeRecipeModel from "../Model/LikeRecipeModel.js";
import SaveRecipeModel from "../Model/SaveRecipeModel.js";
import UserModel from "../Model/UserModel.js";
import { compair, generatePassword } from "../Utils/bcriptPassword.js";
import { generateToken } from "../Utils/JWTtoken.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email and password is require "});
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user?.auth) res.status(400).json({ message: "User not authenticate" });

        const auth = await compair(password, user?.password);
        if (!auth) return res.status(400).json({ message: "Password does not match" });

        const token = await generateToken({ id: user?._id });
        res.status(200).json({ message: "Login Successful", user, token });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}

export const signUp = async (req, res) => {
    const { name, email, password} = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "hj" });
    
    try {
        const is_exist = await UserModel.findOne({ email });
        if (is_exist) res.status(400).json({ message: "User already exist" });

        const hashPassword = await generatePassword(password);
        const imageData = req.upload;
        const otp = Math.floor(Math.random() * 10000);
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
            imageURL: imageData?.url,
            imageID: imageData?.id,
            otp: otp
        });
        await newUser.save();
        return res.status(201).json({ message: "User create Successfully! Please check Email for verification" });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}

export const authenticate = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "email and otp is require" });
    
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res,status(400).json({ message: "User not exist" });

        if (otp !== user?.otp) return res.status(404).json({ message: "Otp does not match" });
        const newSaveRecipe = new SaveRecipeModel({
            user: user?._id
        });
        await newSaveRecipe.save();
        const newLikeRecipe = new LikeRecipeModel({
            user: user?._id
        });
        await newLikeRecipe.save();
        res.status(200).json({ message: "User authenticate successfully" });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}

export const me = async () => {
    try {
        const user = req.user;
        const token = generateToken({ id: user?._id });
        res.status(200).json({ message: "Login Successful", user, token });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}