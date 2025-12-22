import { create } from 'zustand'
import useCategoryStore from './CategoryStore';
import { axiosInstance } from '../Utils/API';

type recipe = {
    strMeal: string,
    strMealThumb: string,
    idMeal: string,
}

type country = {
    strArea: string
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
    name: null | string,

    countryList: null | [country],

    recipeDetail: null | recipeStruct
    getAllRecipeByCategory: () => Promise<void>,
    setRecipe: (data: recipe) => void,
    setRecipeDetail: () => Promise<void>,

    getCountryName: () => Promise<void>,
    getRecipeByCountry: (country: string) => Promise<void>,
    getRecipeByName: (name: string) => Promise<boolean>
}

const useRecipeStore = create<Store>()((set, get) => ({
    recipes: null,
    recipe: null,
    recipeDetail: null,

    name: null,

    countryList: null,

    getAllRecipeByCategory: async () => {
        set({ recipes: null });
        try {
            const category = useCategoryStore.getState().category?.strCategory;
            const response = await axiosInstance.post("api/recipe/getMealsByCategory", {
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
        set({ recipeDetail: null });
        try {
            const format =
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

            const id = useRecipeStore.getState().recipe?.idMeal;
            const response = await axiosInstance.get(`api/recipe/getMealsByID/${id}`);
            const youtubeUrl = response?.data?.meal?.strYoutube;
            const match = youtubeUrl?.match(format);
            const videoId = match?.[1]; // 👈 THIS is what we need

            set({
                recipeDetail: {
                    ...response?.data?.meal,
                    strYoutube: videoId, // store ONLY the ID
                },
            });
        } catch (error: any) {
            console.log(error?.message);
        }
    },

    getCountryName: async () => {
        try {
            const response = await axiosInstance.get("api/recipe/getCountryName");
            if (response) {
                set({ countryList: response?.data?.response });
            }
        } catch (error: any) {
            alert(error?.response?.data?.message || error?.message)
        }
    },
    
    getRecipeByCountry: async (country: string) => {
        set({ recipes: null });
        try {
            const response = await axiosInstance.post("api/recipe/getRecipeByCountry", {
                country: country
            });
            if (response) {
                set({ recipes: response?.data?.response });
            }
        } catch (error: any) {
            alert(error?.response?.data?.message || error?.message)
        }
    },

    getRecipeByName: async (name: string) => {
        set({ recipes: null });
        set({ name: null });
        try {
            const response = await axiosInstance.post("api/recipe/getRecipeByName", {
                name: name
            });
            set({ recipes: response?.data?.response, name: name });
            return true
        } catch (error: any) {
            alert(error?.response?.data?.message || error?.message);
            return false;
        }
    }
}));

export default useRecipeStore;