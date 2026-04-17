const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const register = async(req,res)=> {
    const{name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Error creating user' });

    }
}
    const login = async(req,res) => {
        const {email,password} = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
        
        const token =  jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
     return res.status(200).json({ token });
        }
     catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    }


module.exports = { register, login};