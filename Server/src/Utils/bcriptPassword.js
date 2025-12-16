import bcrypt from "bcryptjs";

export const generatePassword = async (password) => {
    return await bcrypt.hash(password, 15);
}

export const compair = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}