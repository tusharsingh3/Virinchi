// models/Counter.js
const mongoose = require('mongoose');

// This schema will store the last sequence number for a given model.
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // The name of the model, e.g., 'enquiry'
    seq: { type: Number, default: 0 }, // The last sequence number used
});

// Create the model from the schema
const Counter = mongoose.model('Counter', counterSchema);

/**
 * A helper function to get the next auto-incremented ID for a given model name.
 * @param {string} name - The name of the sequence (e.g., 'enquiryId').
 * @returns {Promise<number>} The next sequence number.
 */
async function getNextSequence(name) {
    const ret = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // 'new' returns the updated doc, 'upsert' creates it if it doesn't exist
    );
    return ret.seq;
}

module.exports = { Counter, getNextSequence };
