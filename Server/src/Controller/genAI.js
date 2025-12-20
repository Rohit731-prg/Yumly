import { generatePrompt } from "../Utils/prompt.js";

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

export const sendPrompt = async (req, res) => {
    const { ingredients, time, people } = req.body;
    try {
        const prompt = generatePrompt(ingredients, time, people);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        let result = response.text;
        try {
            const trim = result.trim().replace(/^```json/, "").replace(/```$/, "");
            const json = JSON.parse(trim);
            result = json;
        } catch (error) {
            return res.status(400).json({ message: "Invalid JSON format getting from AI" });
        }
        res.status(200).json({ message: "Prompt sent successfully", result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}