import { create } from 'zustand';
import { axiosInstance } from '../Utils/API';

interface responseInterface {
    name: string,
    time: string,
    description: string,
    steps: Array<string>
}

interface dataInterface {
    name: string,
    time: string,
    people: string
}

type Store = {
  response: null | [responseInterface],
  getResponse: (data: any) => Promise<boolean>
}

const useGenStore = create<Store>()((set) => ({
  response: null,

  getResponse: async (data: dataInterface) => {
    set({ response: null });
    try {
        const response = await axiosInstance.post("api/genAI/getRecipe", {
          ingredients: data.name,
          time: data.time,
          people: data.people
        });
        set({ response: response.data?.result?.recipes });
        return true
    } catch (error: any) {
        alert(error?.response?.data?.message || error?.message);
        return false;
    }
  }
}));

export default useGenStore