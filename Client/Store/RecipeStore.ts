import { create } from 'zustand'
import useCategoryStore from './CategoryStore';
import { axiosInstance } from '@/Utils/API';

type recipe = {
    strMeal: string,
    strMealThumb: string,
    idMeal: string
}

type Store = {
    recipes: null | [recipe],
    recipe: null | recipe,
    getAllRecipeByCategory: () => Promise<void>,
    setRecipe: (id: string) => Promise<void>
}

const useRecipeStore = create<Store>()((set) => ({
  recipes: null,
  recipe: null,

  getAllRecipeByCategory: async () => {
    try {
        const category = useCategoryStore.getState().category?.strCategory;
        const response = await axiosInstance.post("https://mzhltj56-4000.inc1.devtunnels.ms/api/recipe/getMealsByCategory", {
            category
        });
        set({ recipes: response?.data?.recipes })
    } catch (error: any) {
        console.log(error?.message);
    }
},

setRecipe: async (id: String) => {
    try {
        const response = await axiosInstance.get(`https://mzhltj56-4000.inc1.devtunnels.ms/api/recipe/getMealsByID${id}`);
        set({ recipe: response?.data?.meal })
    } catch (error: any) {
        console.log(error?.message);
    }
  }
}));

export default useRecipeStore;