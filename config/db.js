// config/db.js
const mongoose = require('mongoose');

// Replace this with your connection string from MongoDB Atlas
const MONGO_URI = 'mongodb+srv://ts360523:tushar123@virinchi.dmyb0dh.mongodb.net/?retryWrites=true&w=majority&appName=Virinchi';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to MongoDB Atlas.');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;