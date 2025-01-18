const express = require('express');
const app = express();
const cors = require('cors');
const geminiRoutes = require('./routes/geminiRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database connection error:', err));

app.use('/api/recipe', geminiRoutes); 
app.use('/api/auth/', authRoutes); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
