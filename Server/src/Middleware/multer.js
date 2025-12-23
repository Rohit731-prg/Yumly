import multer from "multer";
import cloudinary from "../Config/cloudinary.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const streamUpload = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            resource_type: 'image',
            folder: 'recipe',
        }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        stream.end(fileBuffer);
    })
}

export const uploadImage = async (req, res, next) => {
    if (!req.file) {
        req.upload = {
            url: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
            id: null
        }
        return next();
    }
    try {
        const result = await streamUpload(req.file.buffer);
        req.upload = {
            url: result?.secure_url,
            id: result?.public_id
        };
        next();
        console.log(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error?.message });
    }
};