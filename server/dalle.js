
const generateImageURL = (prompt)=>{
    const width = 1600;
    const height = 1200;
    const seed = 42; 
    const model = 'flux'; 
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
    return imageUrl;
}

