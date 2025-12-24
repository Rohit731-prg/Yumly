import express from "express";
import { authenticate, login, me, signUp, updatePassword } from "../Controller/UserController.js";
import { verify } from "../Middleware/verify.js";
import { upload, uploadImage } from "../Middleware/multer.js";

const route = express.Router();

route.post("/login",  login);
route.post("/signup", upload.single("image"), uploadImage, signUp);
route.put("/auth", authenticate);
route.get("/me", verify, me);

route.put("/updatePassword", verify, updatePassword);

export default route;