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
        const newEnquiry = new Enquiry(req.body);
        const savedEnquiry = await newEnquiry.save();

        // Return only success and the new enquiryId
        res.status(201).json({ success: true, enquiryId: savedEnquiry.enquiryId });

    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            if (errors.email && errors.email.includes('Either email or phone')) {
                errors.general = 'Either email or phone number must be provided.';
            }
            return res.status(400).json({ success: false, message: 'Validation failed.', errors });
        }
        console.error('API Error:', error);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
});

module.exports = router;
