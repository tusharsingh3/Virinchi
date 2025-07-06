// server.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

// Load environment variables with .env.local override support
if (fs.existsSync(path.join(__dirname, '.env.local'))) {
    require('dotenv').config({ path: path.join(__dirname, '.env.local') });
}
require('dotenv').config(); // This will load .env but won't override existing variables

const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// --- Middleware ---
app.use(morgan('combined')); // Request logging
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Define Routes ---
// Use the API routes for enquiries without rate limiting
app.use('/api/enquiry', require('./routes/api/enquiry'));
// Use the page routes for serving HTML
app.use('/', require('./routes/pages'));

// --- 404 Handler ---
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});