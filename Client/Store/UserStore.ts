import { create } from 'zustand'
import { axiosInstance } from '../Utils/API';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface UserInterface {
    name: string,
    email: string,
    imageURL: string
    auth: boolean,
    createdAt: string
    updatedAt: string
}

interface loginInterface {
    email: string,
    password: string
}

export interface ImageFile {
    uri: string;
    name: string;
    type: string;
}


interface signupInterface {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    image: ImageFile
}

type Store = {
    user: null | UserInterface,
    email: null | string,
    login: (data: loginInterface) => Promise<boolean>,
    signUp: (data: signupInterface) => Promise<boolean>,
    authentication: (otp: string) => Promise<boolean>,
    loginWithAuth: () => Promise<boolean>,
    updatePassword: (newPassword: string) => Promise<boolean>
}

const useUserStore = create<Store>()((set, get) => ({
    user: null,
    email: "Saikat@gmail.com",

    login: async (data: loginInterface) => {
        try {
            const response = await axiosInstance.post("api/user/login", {
                email: data.email,
                password: data.password
            });
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
            set({ user: response.data.user });
            return true;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            alert(message);
            return false;
        }
    },

    signUp: async (data: signupInterface) => {
        try {
            console.log(data);
            const newForm = new FormData();
            newForm.append("name", data.name);
            newForm.append("email", data.email);
            newForm.append("password", data.password);
            const response = await axiosInstance.post("api/user/signup", newForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            set({ email: data.email, user: null });
            alert(response.data.message || "User created successfully");
            return true;
        } catch (error: any) {
            console.log("SIGNUP ERROR:", error);
            alert(error.message || "Network error");
            return false;

        }
    },

    authentication: async (otp: string) => {
        try {
            const response = await axiosInstance.put("api/user/auth", {
                email: get().email,
                otp: otp
            });

            alert(response.data.message || "User authenticate successfully");
            return true
        } catch (error: any) {
            console.log("error from authentication", error);
            alert(error?.response?.data?.message || error?.message || "Something went wrong");
            return false;
        }
    },

    loginWithAuth: async () => {
        try {
            const response = await axiosInstance.get("api/user/me");
            set({ user: response.data.user });
            await AsyncStorage.setItem('token', response.data.token);
            return true
        } catch (error: any) {
            console.log(error);
            alert(error?.response?.data?.message || "Something went wrong");
            return false;
        }
    },

    updatePassword: async (newPassword: string) => {
        try {
            const response = await axiosInstance.put("api/user/updatePassword", {
                newPassword
            });
            alert(response.data.message || "Password update successfully");
            return true
        } catch (error) {
            console.log(error);
            alert(error);
            return false;
        }
    }
}));

export default useUserStore