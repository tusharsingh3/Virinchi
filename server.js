// server.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

// Load environment variables with .env.local override support
// Load .env.local first (if it exists), then .env as fallback
if (fs.existsSync(path.join(__dirname, '.env.local'))) {
    require('dotenv').config({ path: path.join(__dirname, '.env.local') });
}
require('dotenv').config(); // This will load .env but won't override existing variables

const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
});

// Rate limiting specifically for API routes (more restrictive)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 API requests per windowMs
    message: {
        success: false,
        message: 'Too many API requests from this IP, please try again later.',
    },
});

// --- Middleware ---
app.use(morgan('combined')); // Request logging
app.use(limiter); // Apply rate limiting to all routes
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Define Routes ---
// Use the API routes for enquiries with additional rate limiting
app.use('/api/enquiry', apiLimiter, require('./routes/api/enquiry'));
// Use the page routes for serving HTML
app.use('/', require('./routes/pages'));

// --- 404 Handler ---
// This should come after all other routes have been defined
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
