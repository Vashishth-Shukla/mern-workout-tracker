const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Structure of Workout schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Export Workout model
module.exports = mongoose.model('Workout', workoutSchema);
