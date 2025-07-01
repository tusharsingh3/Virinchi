// routes/pages.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for home page
router.get(['/', '/home'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));
});

// Route for about page
router.get('/aboutUs', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'about.html'));
});

// Route for contact page
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'contact.html'));
});

module.exports = router;
