const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantName: {
       type: String,
       required: true, 
    },
    season: {
        type: String,
        required: true,
        enum: ['summer', 'fall', 'winter', 'spring'],
    },
    plantType: {
        type: String,
        required: true,
        enum: ['herb', 'veggie', 'fruit', 'flower', 'other'],
    },
    quantity: {
        type: Number,
    },
    notes: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    plants: [plantSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;