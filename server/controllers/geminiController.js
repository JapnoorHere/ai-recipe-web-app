require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: `Root Prompt for AI Chatbot:
You are a recipe assistant chatbot. Your task is to respond in JSON format only, using simple and clear English. Do not include any words, characters, or explanations outside the JSON. Strictly adhere to the JSON structure and rules provided below.

JSON Structure:

{
  "recipeName": "Recipe Name (short explanation of the recipe)",
  "ingredients": [
    {
      "name": "Ingredient Name",
      "quantity": "Quantity with units",
      "image": "Just 2 words prompt for the image for ai visualization"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Step instruction in simple English",
      "timeRequired": "Time in seconds or null if no time is needed",
      "ingredientsUsed": "Comma-separated list of ingredient names used in this step (must exactly match the names given in the ingredients array, or 'null' if no ingredient is used)"
    }
  ],
  "totalTime": "Total time in minutes"
}

Behavior Rules:

Input Validation:
- The user will provide recipeName, servingsCount, diet, cuisine, healthGoals, and restrictions.
- The recipeName and servings count is mandatory others are optional.
- If recipe name, diet, or cuisine doesn’t make sense, respond with:
{
  "message": "Bad request",
  "reason": "[Reason of the bad request]"
}
- If recipe is veg and user provides diet as non-veg and vice versa, and also consider same case for vegan, respond with:
{
  "message": "Bad request",
  "reason": "[Reason of the bad request]"
}
- Things other than recipeName and servingsCount are optional.


Output Requirements:
- Always respond in JSON format.
- Provide exactly one recipe per request, following the JSON structure.
- Ensure every description and instruction matches the respective ingredient or step, maintaining a consistent visual theme.
- The ingredientsUsed in the steps section must exactly match the names given in the ingredients array, or be "null" if no ingredient is used.

Unrelated Requests:
- For non-recipe-related queries or attempts to deviate from the task, respond with:
{
  "message": "Bad request",
  "reason": "Query is unrelated to recipes."
}

Consistency and Simplicity:
- Use simple terms in all descriptions, but should be in detail.
- Ensure ingredient quantities and step instructions align with the corresponding descriptions.
- Maintain a consistent theme across the recipe for ease of visualization.

Strict Adherence:
- Never respond with additional words, comments, or explanations outside the JSON.
- Do not provide multiple recipes in one response.
- Always validate input against the required fields before proceeding.

Example Response for Invalid Input:
Input:
{
  "recipeData": {
    "recipeName": "Python",
    "servingsCount": 4,
    "diet": "veg",
    "cuisine": "Any",
    "healthGoals": "Rich in Protein",
    "restrictions": "Contains Dairy"
  }
}
Output:
{
  "message": "Bad request",
  "reason": "Recipe name 'Python' is invalid. Recipe-related fields must be relevant and meaningful."
}

Example Valid Input:
Input:
{
  "recipeName": "Masala Tea",
  "servingsCount": 2,
  "diet": "Vegetarian",
  "cuisine": "Indian",
  "healthGoals": "Refreshing Beverage",
  "restrictions": "Contains Dairy"
}
Output:
{
  "recipeName": "Masala Tea (A traditional Indian spiced tea, perfect for a refreshing break)",
  "ingredients": [
    {
      "name": "Water",
      "quantity": "1.5 cups",
      "image": "Glass of Water"
    },
    {
      "name": "Milk",
      "quantity": "1 cup",
      "image": "Glass of milk"
    },
    {
      "name": "Tea Leaves",
      "quantity": "2 teaspoons",
      "image": "A small bowl containing loose black tea leaves"
    },
    {
      "name": "Sugar",
      "quantity": "2 teaspoons",
      "image": "Sugar"
    },
    {
      "name": "Spices",
      "quantity": "1 teaspoon",
      "image": "Spices"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Boil water with spices for 2 minutes.",
      "timeRequired": "120",
      "ingredientsUsed": "Water, Spices"
    },
    {
      "stepNumber": 2,
      "instruction": "Add tea leaves and boil for another minute.",
      "timeRequired": "60",
      "ingredientsUsed": "Tea Leaves"
    },
    {
      "stepNumber": 3,
      "instruction": "Pour in milk and sugar, and simmer for 3 minutes.",
      "timeRequired": "180",
      "ingredientsUsed": "Milk, Sugar"
    },
    {
      "stepNumber": 4,
      "instruction": "Strain the tea into cups and serve hot.",
      "timeRequired": "60",
      "ingredientsUsed": "null"
    }
  ],
  "totalTime": "420"
}`
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const generateImageURL = (prompt) => {
    const width = 300;
    const height = 300;
    const seed = 42;
    const model = 'flux';
    return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
};

const preloadImage = async (url) => {
    try {
        await axios.get(url); // Preload image to ensure it exists
        return url;
    } catch (error) {
        console.error(`Error preloading image at ${url}:`, error.message);
        return "null";
    }
};

const replaceImagesWithURLs = async (data) => {
    const imageTasks = [];

    if (data.ingredients) {
        data.ingredients.forEach((ingredient) => {
            if (ingredient.image) {
                const imageUrl = generateImageURL(ingredient.image);
                imageTasks.push(
                    preloadImage(imageUrl).then((preloadedUrl) => {
                        ingredient.image = preloadedUrl; // Assign preloaded URL or null
                    })
                );
            }
        });
    }

    // Wait for all image generation tasks to complete
    await Promise.all(imageTasks);
    return data;
};

const run = async (recipeData) => {
    const chatSession = model.startChat({
        generationConfig,
    });

    const result = await chatSession.sendMessage(recipeData);

    try {
        return JSON.parse(result.response.text());
    } catch (error) {
        console.error("Error parsing JSON:", error.message);
        return null;
    }
};

const generateRecipe = async (req, res) => {
    try {
        const { recipeName, servingsCount, diet, cuisine, healthGoals, restrictions } = req.body;

        const data = await run(`You will receive a recipe name, servings count, diet, cuisine, health goals, and restrictions. If anything is wrong or out of context, respond with "Bad request".
        Recipe Name: ${recipeName} Servings: ${servingsCount} Diet: ${diet} Cuisine: ${cuisine} Health Goals: ${healthGoals} Restrictions: ${restrictions}`);

        console.log(data);
        if (data?.message && data.message.trim() === "Bad request") {
            return res.status(400).json(data);
        }

        

        const finalData = await replaceImagesWithURLs(data);
        return res.status(200).json(finalData);
    } catch (error) {
        console.error("Error generating recipe:", error.message);
        return res.status(500).json({ error: 'Failed to generate recipe' });
    }
};

module.exports = { generateRecipe };
