const mongoose = require('mongoose');

const journeyschema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
})

const Journey = new mongoose.model('journey', journeyschema, 'journeydata');

module.exports = Journey;