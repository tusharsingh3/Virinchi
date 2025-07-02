// routes/api/enquiry.js
const express = require('express');
const router = express.Router();
const Enquiry = require('../../models/Enquiry');

/**
 * @route   POST api/enquiry
 * @desc    Create a new enquiry message
 * @access  Public
 */
router.post('/', async (req, res) => {
    try {
        // Input validation
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Request body cannot be empty.',
            });
        }

        const newEnquiry = new Enquiry(req.body);
        const savedEnquiry = await newEnquiry.save();

        // Return only success and the new enquiryId
        res.status(201).json({ success: true, enquiryId: savedEnquiry.enquiryId });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            let errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            if (errors.email && errors.email.includes('Either email or phone')) {
                errors.general = 'Either email or phone number must be provided.';
            }
            return res.status(400).json({
                success: false,
                message: 'Validation failed.',
                errors,
            });
        }

        // Handle duplicate key errors (though enquiryId should be unique via auto-increment)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'A duplicate entry was detected. Please try again.',
            });
        }

        // Handle MongoDB connection errors
        if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
            console.error('Database connection error:', error);
            return res.status(503).json({
                success: false,
                message: 'Database connection error. Please try again later.',
            });
        }

        // Handle other MongoDB errors
        if (error.name === 'MongoError' || error.name === 'MongoServerError') {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Database error occurred. Please try again later.',
            });
        }

        // Log unexpected errors and return generic message
        console.error('Unexpected API Error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });

        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
});

module.exports = router;
