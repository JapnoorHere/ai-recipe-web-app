const express = require('express');
const app = express();
const cors = require('cors');
const geminiRoutes = require('./routes/geminiRoutes');

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/api/recipe', geminiRoutes); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
