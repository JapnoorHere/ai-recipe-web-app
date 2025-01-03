const axios = require('axios');
const fs = require('fs');

async function generateImages(prompts) {
    const baseUrl = 'https://image.pollinations.ai/prompt/';

    // Create an array of promises for simultaneous generation
    const requests = prompts.map(prompt => {
        const url = `${baseUrl}${encodeURIComponent(prompt)}`;
        return axios.get(url, { responseType: 'arraybuffer' }) // Use arraybuffer to handle image data
            .then(response => {
                console.log(`Image generated for prompt: "${prompt}"`);
                return { prompt, data: response.data, url };
            })
            .catch(error => {
                console.error(`Error generating image for prompt: "${prompt}".`, error.message);
                return { prompt, error: error.message, url };
            });
    });

    // Wait for all requests to complete
    const results = await Promise.all(requests);

    // Process the results
    results.forEach((result, index) => {
        if (result.data) {
            const fileName = `image_${index + 1}.png`;
            fs.writeFileSync(fileName, result.data);
            console.log(`Image for prompt "${result.prompt}" saved as ${fileName}. URL: ${result.url}`);
        } else {
            console.error(`Failed to generate image for prompt "${result.prompt}": ${result.error}`);
        }
    });
}

// Example usage
const prompts = [
    "majestic eagle soaring over a canyon",
    "vintage car parked under a streetlight",
    "hot air balloons floating at sunrise",
    "giant robot battling a dragon",
    "fairy forest with glowing mushrooms",
    "galaxy swirling with stars and planets",
    "ancient library with floating books",
    "abstract art of geometric shapes",
    "a cozy cabin in a snowy mountain",
    "lighthouse by a stormy sea"
];

generateImages(prompts).then(() => {
    console.log("Image generation process completed.");
});
