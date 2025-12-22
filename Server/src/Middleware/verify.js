import UserModel from "../Model/UserModel.js";
import { decode } from "../Utils/JWTtoken.js";

export const verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized! Token missing" });
    }

    // Remove "Bearer "
    const token = authHeader.split(" ")[1];

    const decoded = await decode(token);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized! User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
