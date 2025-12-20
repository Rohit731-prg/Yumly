export const generatePrompt = (ingredients, timeLimit, people) => {
    return `
You are a professional chef assistant.

Ingredients available:
${ingredients}

Time limit: ${timeLimit} min

people serving: ${people}

Task:
Suggest exactly 2 recipes that can be cooked within the time limit.

For each recipe provide:
1. Recipe name
2. Cooking time
3. Short description (2 lines)
4. Step-by-step instructions (max 6 steps)

Rules:
- Use only the given ingredients (basic spices allowed)
- Keep instructions simple
- Do not add extra commentary

Respond ONLY in valid JSON.

"{
  "recipes": [
    {
      "name": "",
      "time": "",
      "description": "",
      "steps": []
    }
  ]
}
`
}