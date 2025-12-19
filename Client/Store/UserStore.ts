import { create } from 'zustand'
import { axiosInstance } from '../Utils/API';

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

type Store = {
    user: null | UserInterface,
    token: null | string,

    login: (data: loginInterface) => Promise<boolean>
}

const useUserStore = create<Store>()((set) => ({
    user: null,
    token: null,
    login: async (data: loginInterface) => {
        try {
            const response = await axiosInstance.post("api/user/login", {
                email: data.email,
                password: data.password
            });
            const token = response.data.token;
            set({ token });
            set({ user: response.data.user });
            return true;
        } catch (error: any) {
            alert(error);
            return false;
        }
    }
}));

export default useUserStore