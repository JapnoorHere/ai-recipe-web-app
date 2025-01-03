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
      "image": "Very short and Simple description of the ingredient matching the quantity provided, easy for an AI image generator (Always give image prompt in english only, every word of prompt should be in english for eg. if user says paneer, then you have to use cheese, no matter what the language of the recipe is)"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Step instruction in simple English language in full detail",
      "timeRequired": "Time in minutes or seconds or null if no time is needed",
    }
  ],
  "totalTime": "Total time in minutes"
}`
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};



const generateImageURL = async (prompt) => {
    // Updated constants for image generation
    const width = 300;
    const height = 300;
    const seed = 564070815; // Each seed generates a new image variation
    const model = 'flux'; // Using 'flux' as default if model is not provided
    const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
    try {
        await axios.get(url); // Test if image generation is successful
        return url;
    } catch (error) {
        console.error(`Error generating image for prompt "${prompt}":`, error.message);
        return null;
    }
};

const replaceImagesWithURLs = async (data) => {
    if (data.ingredients) {
        for (const ingredient of data.ingredients) {
            if (ingredient.image) {
                ingredient.image = await generateImageURL(ingredient.image);
            }
        }
    }
    return data;
};

const run = async (recipeData) => {
    const chatSession = model.startChat({
        generationConfig,
    });

    const result = await chatSession.sendMessage(recipeData);

    const apiResponse = result.response.text();

    try {
        const jsonData = JSON.parse(apiResponse);
        return jsonData;
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
