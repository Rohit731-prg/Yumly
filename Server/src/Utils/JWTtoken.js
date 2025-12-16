import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.JWT_CODE, { expiresIn: '1d' });
}

export const decode = async (token) => {
    return await jwt.decode(token, process.env.JWT_CODE);
}