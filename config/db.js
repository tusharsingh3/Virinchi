// config/db.js
const mongoose = require('mongoose');

// Get MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

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
