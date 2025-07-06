// models/Enquiry.js
const mongoose = require('mongoose');
const { getNextSequence } = require('./Counter'); // Import the helper function

const enquirySchema = new mongoose.Schema(
    {
        enquiryId: {
            type: Number,
            unique: true, // Ensures no two enquiries can have the same ID
        },
        name: {
            type: String,
            required: [true, 'Name is required.'],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    if (!v) return true;
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: 'Please enter a valid email address.',
            },
        },
        phone: {
            type: String,
            trim: true,
            validate: {
                // UPDATED VALIDATION: Stricter regex for exactly 10 digits
                validator: function (v) {
                    if (!v) return true;
                    return /^\+?[0-9]{10}$/.test(v);
                },
                message: 'Please enter a valid 10-digit phone number.',
            },
        },
        message: {
            type: String,
            required: [true, 'Message is required.'],
            minLength: [10, 'Message must be at least 10 characters.'],
            maxLength: [500, 'Message cannot exceed 500 characters.'],
            trim: true,
        },
        remarks: {
            type: String,
            default: '',
        },
        isFollowedUp: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Mongoose "pre-save" hook. This function will run automatically before a document is saved.
enquirySchema.pre('save', async function (next) {
    // Only set the enquiryId if it's a new document
    if (this.isNew) {
        try {
            // Get the next sequence number and assign it to the enquiryId field
            this.enquiryId = await getNextSequence('enquiryId');
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Custom validation to ensure either email or phone is provided
enquirySchema.pre('validate', function (next) {
    if (!this.email && !this.phone) {
        this.invalidate('email', 'Either email or phone number must be provided.');
    }
    next();
});

module.exports = mongoose.model('Enquiry', enquirySchema, 'Enquiries');
