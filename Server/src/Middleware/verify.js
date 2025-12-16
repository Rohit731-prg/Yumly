import UserModel from "../Model/UserModel.js";
import { decode } from "../Utils/JWTtoken.js";


export const verify = async (req, res, naxt) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(400).json({ message: "Unautherized" });
    try {
        const docode = await decode(token);
        const user = await UserModel.findById(docode?.id);
        if(!user || !user?.auth) return res.status(400).json({ message: "Unautherized" });

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}