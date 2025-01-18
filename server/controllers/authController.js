const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup =  async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists!' });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'created', user:{name,email} });
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({ message: 'Server error!' });
    }
}




const signin =  async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({ message: 'User not found!' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
}

module.exports = {signup,signin};
