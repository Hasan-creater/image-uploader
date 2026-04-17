const express = require( 'express');
const mongoose =require('mongoose');
const cors = require( 'cors');
const dotenv =require('dotenv');
const path = require('path');
dotenv.config();

const authRoutes =require('./routes/authRoutes.js');
const imageRoutes= require( './routes/imageRoutes.js');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',    
  methods: ['GET', 'POST'],           
  allowedHeaders: ['Authorization',   
                   'Content-Type'],
  credentials: true               
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });