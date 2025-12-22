import axios from "axios";

export const getAllCategory = async (req, res) => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        const categorys = response?.data?.categories;
        if (!categorys) return res.status(400).json({ message: "No category found" });
        res.status(200).json({ category: categorys });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}

export const getAllRecipeByCategory = async (req, res) => {
    const { category } = req.body;
    if (!category) return res.status(400).json({ message: "Category is require" });

    try {
        const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const recipes = data?.data?.meals
        if(!recipes) return res.status(400).json({ message: "No Meals found" });
        res.status(200).json({ recipes });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

export const getMealDataByID = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const meal = data?.data?.meals[0];
        if(!meal) return res.status(400).json({ message: "No data found" });
        res.status(200).json({ meal });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

export const getAllCountryName = async (req, res) => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const data = response?.data?.meals;
        res.status(200).json({ response: data });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

export const getRecipeByCountry = async (req, res) => {
    const { country } = req.body;
    if (!country) return res.status(400).json({ message: "Country name is require "});
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
        const data = response?.data?.meals;
        res.status(200).json({ response: data });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

export const getRecipesByName = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        if (response) {
            const data = response?.data?.meals;
            return res.status(200).json({ response: data });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}