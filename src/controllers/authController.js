const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');

const register = async (req, res) => {
    const { email, password, username } = req.body;
    // Validate user data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, email and password are required' });
    }

    try {
        const existingUser = await User.findOne({
            email: email
        })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        const token = generateToken({ id: user._id, email: email });

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate user data
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ id: user._id, email: user.email });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    register,
    login
};