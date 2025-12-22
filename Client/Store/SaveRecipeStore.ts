import { create } from 'zustand'
import { axiosInstance } from '../Utils/API'

interface coreRecipe {
  idMeal: string,
  strMeal: string,
  strMealThumb: string
}

// interface saveListInterface {
//   saveList: Array<coreRecipe>
// }

type Store = {
  saveRecipes: null | [coreRecipe],
  updateSaveRecipe: (id: string) => Promise<void>,
  getSaveRecipe: () => Promise<void>
}

const useSaveRecipeStore = create<Store>()((set) => ({
  saveRecipes: null,

  updateSaveRecipe: async (id: string) => {
    alert(id)
    try {
      const response = await axiosInstance.put(`api/save/updateSaveRecipe/${id}`);
      alert(response?.data?.message)
    } catch (error: any) {
      alert(error?.response?.data?.message || error?.message)
      console.log(error?.response?.data?.message || error?.message)
    }
  },

  getSaveRecipe: async () => {
    try {
      const response = await axiosInstance.get("api/save/getAllRecipe");
      set({ saveRecipes: response?.data.saveList.saveList });
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.message || error?.message)
    }
  }
}));

export default useSaveRecipeStore