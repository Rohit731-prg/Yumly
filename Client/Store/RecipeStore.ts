import { create } from 'zustand'
import useCategoryStore from './CategoryStore';
import { axiosInstance } from '../Utils/API';

type recipe = {
    strMeal: string,
    strMealThumb: string,
    idMeal: string,
}

export type recipeStruct = {
    idMeal: string,
    strMeal: string,
    strMealAlternate: string | null,
    strCategory: string,
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    strTags: string,
    strYoutube: string,

    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strIngredient8: string
    strIngredient9: string
    strIngredient10: string
    strIngredient11: string
    strIngredient12: string
    strIngredient13: string
    strIngredient14: string
    strIngredient15: string
    strIngredient16: string
    strIngredient17: string
    strIngredient18: string
    strIngredient19: string
    strIngredient20: string

    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    strMeasure11: string
    strMeasure12: string
    strMeasure13: string
    strMeasure14: string
    strMeasure15: string
    strMeasure16: string
    strMeasure17: string
    strMeasure18: string
    strMeasure19: string
    strMeasure20: string
}

type Store = {
    recipes: null | [recipe],
    recipe: null | recipe,
    recipeDetail: null | recipeStruct
    getAllRecipeByCategory: () => Promise<void>,
    setRecipe: (data: recipe) => void,
    setRecipeDetail: () => Promise<void>
}

const useRecipeStore = create<Store>()((set) => ({
    recipes: null,
    recipe: null,
    recipeDetail: null,


    getAllRecipeByCategory: async () => {
        try {
            const category = useCategoryStore.getState().category?.strCategory;
            const response = await axiosInstance.post("https://x8wzk6t6-3000.inc1.devtunnels.ms/api/recipe/getMealsByCategory", {
                category
            });
            set({ recipes: response?.data?.recipes })
        } catch (error: any) {
            console.log(error?.message);
        }
    },

    setRecipe: async (data: recipe) => {
        set({ recipe: data })
    },

    setRecipeDetail: async () => {
        try {
            const id = useRecipeStore.getState().recipe?.idMeal;
            const response = await axiosInstance.get(`https://x8wzk6t6-3000.inc1.devtunnels.ms/api/recipe/getMealsByID/${id}`);
            set({ recipeDetail: response?.data?.meal })
        } catch (error: any) {
            console.log(error?.message);
        }
    },
}));

export default useRecipeStore;