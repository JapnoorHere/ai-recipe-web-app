require('dotenv').config();

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

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
      "image": "Simple description of the ingredient matching the quantity provided, easy for an AI image generator (Always give image prompt in english only, no matter what the language of the recipe is)"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Step instruction in simple English",
      "timeRequired": "Time in minutes or null if no time is needed",
      "image": "Description of the step matching the instruction, ensuring consistency with the recipe theme (Always give image prompt in english only, no matter what the language of the recipe is)"
    }
  ],
  "totalTime": "Total time in minutes"
}
Behavior Rules:
Input Validation:

The user will provide recipeName, servingsCount, diet, cuisine, healthGoals, and restrictions.
If recipe name, diet or cuisine, dont make sense, respond with:
{
  "message": "Bad request",
  "reason": "Query is unrelated to recipes."
}
Things other than recipeName and servingsCount are optional.    
If any field is unrelated to the task, respond with:

{
  "message": "Bad request",
  "reason": "Recipe-related fields must be relevant and meaningful."
}
Output Requirements:

Always respond in JSON format.
Provide exactly one recipe per request, following the JSON structure.
Ensure every image description matches the respective ingredient or step, maintaining a consistent visual theme.
Unrelated Requests:

For non-recipe-related queries or attempts to deviate from the task, respond with:

{
  "message": "Bad request",
  "reason": "Query is unrelated to recipes."
}
Consistency and Simplicity:

Use simple terms in all descriptions.
Ensure ingredient quantities and step instructions align with the corresponding image descriptions.
Maintain a consistent theme across the recipe for ease of visualization.
Strict Adherence:

Never respond with additional words, comments, or explanations outside the JSON.
Do not provide multiple recipes in one response.
Always validate input against the required fields before proceeding.
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
"reason": Recipe name 'Python' is invalid. Recipe-related fields must be relevant and meaningful."
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
      "image": "A cup of clear water, freshly poured and ready for boiling"
    },
    {
      "name": "Milk",
      "quantity": "1 cup",
      "image": "A glass of fresh milk, white and smooth"
    },
    {
      "name": "Tea Leaves",
      "quantity": "2 teaspoons",
      "image": "A small bowl containing loose black tea leaves"
    },
    {
      "name": "Sugar",
      "quantity": "2 teaspoons",
      "image": "A small pile of white sugar crystals on a teaspoon"
    },
    {
      "name": "Spices",
      "quantity": "1 teaspoon",
      "image": "A mix of crushed cardamom, cinnamon, and ginger on a small plate"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Boil water with spices for 2 minutes.",
      "timeRequired": "2",
      "image": "A pot of boiling water with spices floating on the surface"
    },
    {
      "stepNumber": 2,
      "instruction": "Add tea leaves and boil for another minute.",
      "timeRequired": "1",
      "image": "The pot now has tea leaves steeping in the boiling water"
    },
    {
      "stepNumber": 3,
      "instruction": "Pour in milk and sugar, and simmer for 3 minutes.",
      "timeRequired": "3",
      "image": "The tea turns a creamy brown as milk and sugar are added, simmering gently"
    },
    {
      "stepNumber": 4,
      "instruction": "Strain the tea into cups and serve hot.",
      "timeRequired": "1",
      "image": "Two cups of steaming masala tea, ready to enjoy"
    }
  ],
  "totalTime": "7"
}`
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
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
    }
};

const generateRecipe = async (req, res) => {

    
    try {
        const { recipeName, servingsCount, diet, cuisine, healthGoals, restrictions } = req.body;
        console.log("Request body:", req.body);

        const data = await run(`You will receive a recipe name, servings count, diet, cuisine, health goals, and restrictions, if anything is wrong or out of context, respond with "Bad request".
        Recipe Name: ${recipeName} Servings: ${servingsCount} Diet: ${diet} Cuisine: ${cuisine} Health Goals: ${healthGoals} Restrictions: ${restrictions}`);
        const finalData = replaceImagesWithURLs(data);
        console.log(finalData);
        if (data.message.trim() === "Bad request") {
            return res.status(400).json(data);
        }
        return res.status(200).json(finalData);
    } catch (error) {
        console.error("Error generating recipe:", error.message);
        return res.status(500).json({ error: 'Failed to generate recipe' });
    }
};


const generateImageURL = (prompt) => {
    const width = 1600;
    const height = 1200;
    const seed = 42;
    const model = 'flux';
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
    return imageUrl;
}



const replaceImagesWithURLs = (data) => {
    if (data.ingredients) {
        data.ingredients.forEach(ingredient => {
            if (ingredient.image) {
                ingredient.image = generateImageURL(ingredient.image);
            }
        });
    }

    if (data.steps) {
        data.steps.forEach(step => {
            if (step.image) {
                step.image = generateImageURL(step.image);
            }
        });
    }

    return data;
}

module.exports = { generateRecipe };
