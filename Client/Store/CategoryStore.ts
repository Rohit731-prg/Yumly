import { axiosInstance } from '@/Utils/API';
import { create } from 'zustand';

type categortSet = {
    idCategory: string;
    strCategoryThumb: string;
    strCategory: string;
};

type Store = {
    categories: categortSet[] | null;
    category: categortSet | null;

    getAllCategory: () => Promise<void>;
    setCategory: (category: categortSet) => void;
};

const useCategoryStore = create<Store>((set) => ({
    categories: null,
    category: null,

    getAllCategory: async () => {
        try {
            const response = await axiosInstance.get(
                'https://mzhltj56-4000.inc1.devtunnels.ms/api/recipe/getAllCaategory'
            );
            set({ categories: response.data.category });
        } catch (error) {
            console.log(error);
        }
    },

    setCategory: (category) => set({ category }),
}));

export default useCategoryStore;
